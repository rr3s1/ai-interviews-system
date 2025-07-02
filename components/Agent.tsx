"use client";

import React, {useState} from 'react';
import { cn } from "@/lib/utils";

import Image from 'next/image';


enum CallStatus {
    INACTIVE = "INACTIVE",
    CONNECTING = "CONNECTING",
    ACTIVE = "ACTIVE",
    FINISHED = "FINISHED",
}


const Agent = ({
                   userName
               }: AgentProps) => {
    const callStatus = CallStatus.FINISHED;
    const isSpeaking = true;
    const messages = ["What's your name?","My name is John Doe"];
    const lastMessage = messages[messages.length - 1];

    return (
        <>
            <div className="call-view">
                {/* AI Interviewer Card */}
                <div className="card-interviewer">
                    <div className="avatar">
                        <Image
                            src="/ai-avatar.png"
                            alt="profile-image"
                            width={65}
                            height={54}
                            className="object-cover"
                        />
                        {isSpeaking && <span className="animate-speak" />}
                    </div>
                    <h3>AI Interviewer</h3>
                </div>

                {/* User Profile Card */}
                <div className="card-border">
                    <div className="card-content">
                        <Image
                            src="/user-avatar.png"
                            alt="profile-image"
                            width={539}
                            height={539}
                            className="rounded-full object-cover size-[120px]"
                        />
                        <h3>{userName}</h3>
                    </div>
                </div>


                <div className="w-full flex justify-center">
                    {callStatus !== "ACTIVE" ? (
                        <button className="relative btn-call" onClick={() => handleCall()}>
            <span
                className={cn(
                    "absolute animate-ping rounded-full opacity-75",
                    callStatus !== "CONNECTING" && "hidden"
                )}
            />

                            <span className="relative">
              {callStatus === "INACTIVE" || callStatus === "FINISHED"
                  ? "Call"
                  : ". . ."}
            </span>
                        </button>
                    ) : (
                        <button className="btn-disconnect" onClick={() => handleDisconnect()}>
                            End
                        </button>
                    )}
                </div>
            </div>
        </>
    )
}
export default Agent



