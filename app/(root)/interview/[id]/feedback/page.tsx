import { redirect } from "next/navigation";
import {
    getFeedbackByInterviewId,
    getInterviewById,
} from "@/lib/actions/general.action";
import { getCurrentUser } from "@/lib/actions/auth.action";

// The Feedback page component fetches and displays feedback for a specific interview.
const Feedback = async ({ params }: RouteParams) => {
    // Extracts the interview ID from the page URL parameters.
    const { id } = await params;

    // Retrieves the current logged-in user's data.
    const user = await getCurrentUser();

    // Fetches the interview details using the ID.
    const interview = await getInterviewById(id);
    // If the interview doesn't exist, redirect to the homepage.
    if (!interview) redirect("/");

    // Fetches the AI-generated feedback for the specific interview and user.
    const feedback = await getFeedbackByInterviewId({
        interviewId: id,
        userId: user?.id!,
    });

    // Renders the page content (UI to display feedback will be added here).
    return (
        <div> Page </div>
    );
};

export default Feedback;