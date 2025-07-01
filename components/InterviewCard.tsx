import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";
import { getRandomInterviewCover } from "@/lib/utils";

// The InterviewCard component receives interview data as props.
const InterviewCard = async ({
                                 id,
                                 userId,
                                 role,
                                 type,
                                 techstack,
                                 createdAt,
                             }: Interview) => {
    // For now, feedback is mocked as null.
    const feedback = null as Feedback | null ;

    // Normalize the interview type for display consistency.
    const normalizedType = /mix/gi.test(type) ? "Mixed" : type;

    // Format the creation date into a readable string using dayjs.
    const formattedDate = dayjs(
        feedback?.createdAt || createdAt || Date.now()
    ).format("MMM D, YYYY");

    return (
        <article className="card-border w-[360px] max-sm:w-full min-h-96">
            <div className="card-interview">
                <div>
                    {/* The badge is absolutely positioned at the top-right corner. */}
                    <div className="absolute top-0 right-0 w-fit px-4 py-2 rounded-bl-lg bg-light-600">
                        <p className="badge-text">{normalizedType}</p>
                    </div>

                    {/* The cover image is fetched randomly from a predefined list. */}
                    <Image
                        src={getRandomInterviewCover()}
                        alt="cover-image"
                        width={90}
                        height={90}
                        className="rounded-full object-fit size-[90px]"
                    />
                </div>
                {/* Additional card content for role, date, and tech stack would go here. */}
            </div>
        </article>
    );
};

export default InterviewCard;