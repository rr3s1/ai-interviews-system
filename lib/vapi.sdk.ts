// /lib/vapi.sdk.ts

// Import the Vapi class from the installed web SDK package.
import Vapi from "@vapi-ai/web";

// Create and export a new instance of the Vapi client.
// This instance is configured with the public token from the environment variables.
// The '!' is a TypeScript non-null assertion, indicating that the value is expected to be present.
export const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_WEB_TOKEN!);