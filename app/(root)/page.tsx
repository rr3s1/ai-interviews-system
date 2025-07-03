import React from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import InterviewCard from "@/components/InterviewCard";
import {getCurrentUser} from "@/lib/actions/auth.action"
import {getInterviewByUserId, getLatestInterviews} from "@/lib/actions/general.action"

const HomePage = async () => {
    const user = await getCurrentUser();
    const [userInterviews, allInterview] = await Promise.all([
        getInterviewByUserId(user?.id!),
        getLatestInterviews({ userId: user?.id! }),
    ]);

    const hasPastInterviews = userInterviews?.length! > 0;
    const hasUpcomingInterviews = allInterview?.length! > 0;


    return (
        <>
            {/* CTA Section */}
            <section className="card-cta">
                <div className="flex flex-col gap-6 max-w-lg">
                    <h2>Get Interview-Ready with AI-Powered Practice & Feedback</h2>
                    <p className="text-lg">
                        Practice real interview questions & get instant feedback
                    </p>
                    <Button asChild className="btn-primary max-sm:w-full">
                        <Link href="/interview">Start an Interview</Link>
                    </Button>
                </div>
                <Image src="/robot.png" alt="robo-dude" width={400} height={400} className="max-sm:hidden" />
            </section>

            {/* Your Interviews Section */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Your Interviews</h2>
                <div className="interviews-section">
                    {/* Map over the dummy data to render a card for each interview. */}
                    {
                        hasPastInterviews ? (
                            userInterviews?.map(interview => (
                                <InterviewCard
                                    key={interview.id}
                                    {...interview}
                                />
                            ))) : (
                            <p>No interviews at this moment</p>
                        )

                    }
                    {/* Placeholder for when no interviews exist. */}
                    {/* <p>You haven't taken any interviews yet</p> */}
                </div>
            </section>

            {/* Take Interviews Section (Example) */}
            <section className="flex flex-col gap-6 mt-8">
                <h2>Take Interviews</h2>
                <div className="interviews-section">
                    {hasUpcomingInterviews ? (
                        allInterview?.map((interview) => (
                            <InterviewCard
                                key={interview.id}
                                userId={user?.id}
                                interviewId={interview.id}
                                role={interview.role}
                                type={interview.type}
                                techstack={interview.techstack}
                                createdAt={interview.createdAt}
                            />
                        ))
                    ) : (
                        <p>There are no interviews available</p>
                    )}
                    {/* Placeholder for when no interviews are available. */}
                    {/* <p>There are no interviews available</p> */}
                </div>
            </section>
        </>
    );
};

export default HomePage;