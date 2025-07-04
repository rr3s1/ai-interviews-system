"use server";

import { getAdminDb } from "@/firebase/admin";
import { generateObject } from "ai";
import { google } from "@ai-sdk/google";
import { feedbackSchema } from "@/constants";

// Fetches all interviews for a specific user, ordered by creation date.
export async function getInterviewByUserId(userId: string): Promise<Interview[] | null> {
    const db = await getAdminDb();
    const interviews = await db
        .collection("interviews")
        .where("userId", "==", userId)
        .orderBy("createdAt", "desc")
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

// Fetches the latest finalized interviews from other users.
export async function getLatestInterviews(
    params: GetLatestInterviewsParams
): Promise<Interview[] | null> {
    const { userId, limit = 20 } = params;

    const db = await getAdminDb();
    const interviews = await db
        .collection("interviews")
        .orderBy("createdAt", "desc")
        .where("finalized", "==", true)
        .where("userId", "!=", userId)
        .limit(limit)
        .get();

    return interviews.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as Interview[];
}

// Fetches a single interview by its document ID.
export async function getInterviewById(id: string): Promise<Interview | null> {
    const db = await getAdminDb();
    const interview = await db.collection("interviews").doc(id).get();
    return interview.data() as Interview | null;
}

// Creates AI-generated feedback for an interview and stores it in Firestore.
export async function createFeedback(params: CreateFeedbackParams) {
    const { interviewId, userId, transcript, feedbackId } = params;

    try {
        // Formats the transcript into a single string for AI processing.
        const formattedTranscript = transcript
            .map(
                (sentence: { role: string; content: string }) =>
                    `- ${sentence.role}: ${sentence.content}\n`
            )
            .join("");

        // Generates a structured JSON object from the AI based on a schema.
        const { object } = await generateObject({
            model: google("gemini-2.0-flash-001", {
                structuredOutputs: false,
            }),
            schema: feedbackSchema, // Defines the expected output structure.
            prompt: `
        You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
        Transcript:
        ${formattedTranscript}

        Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
        - **Communication Skills**: Clarity, articulation, structured responses.
        - **Technical Knowledge**: Understanding of key concepts for the role.
        - **Problem-Solving**: Ability to analyze problems and propose solutions.
        - **Cultural & Role Fit**: Alignment with company values and job role.
        - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
        `,
            system:
                "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
        });

        // Prepares the feedback data for database insertion.
        const feedback = {
            interviewId: interviewId,
            userId: userId,
            totalScore: object.totalScore,
            categoryScores: object.categoryScores,
            strengths: object.strengths,
            areasForImprovement: object.areasForImprovement,
            finalAssessment: object.finalAssessment,
            createdAt: new Date().toISOString(),
        };

        let feedbackRef;

        // Uses an existing document ID if provided, otherwise creates a new one.
        const db = await getAdminDb();
        if (feedbackId) {
            feedbackRef = db.collection("feedback").doc(feedbackId);
        } else {
            feedbackRef = db.collection("feedback").doc();
        }

        // Saves the feedback to Firestore.
        await feedbackRef.set(feedback);

        // Returns a success indicator and the feedback ID.
        return { success: true, feedbackId: feedbackRef.id };
    } catch (error) {
        console.error("Error saving feedback:", error);
        return { success: false };
    }
}

// Fetches feedback for a specific interview and user.
export async function getFeedbackByInterviewId(
    params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
    const { interviewId, userId } = params;

    // Queries the database for a feedback document matching the interview and user IDs.
    const db = await getAdminDb();
    const querySnapshot = await db
        .collection("feedback")
        .where("interviewId", "==", interviewId)
        .where("userId", "==", userId)
        .limit(1)
        .get();

    // Returns null if no feedback is found.
    if (querySnapshot.empty) return null;

    // Returns the feedback data including its document ID.
    const feedbackDoc = querySnapshot.docs[0];
    return { id: feedbackDoc.id, ...feedbackDoc.data() } as Feedback;
}
