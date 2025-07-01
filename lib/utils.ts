import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getRandomInterviewCover(): string {
  const covers = [
    "/covers/adobe.png",
    "/covers/amazon.png",
    "/covers/facebook.png",
    "/covers/hostinger.png",
    "/covers/pinterest.png",
    "/covers/quora.png",
    "/covers/reddit.png",
    "/covers/skype.png",
    "/covers/spotify.png",
    "/covers/telegram.png",
    "/covers/tiktok.png",
    "/covers/yahoo.png"
  ];

  return covers[Math.floor(Math.random() * covers.length)];
}
