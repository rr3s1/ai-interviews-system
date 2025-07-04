"use server";

import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
    const apps = getApps();

    if (!apps.length) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                // Replace newlines in the private key
                privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        });
    }

    return {
        auth: getAuth(),
        db: getFirestore(),
    };
}

// Cache the initialized Firebase Admin instance
const adminInstance = initFirebaseAdmin();

// Export async functions to get auth and db
export async function getAdminAuth() {
    return adminInstance.auth;
}

export async function getAdminDb() {
    return adminInstance.db;
}
