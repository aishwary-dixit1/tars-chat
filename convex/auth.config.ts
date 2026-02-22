// Navigate to Clerk Dashboard -> JWT Templates -> New Template -> Convex
// Copy the Issuer URL and paste it below.
export default {
  providers: [
    {
      domain: "https://your-clerk-issuer-url.clerk.accounts.dev",
      applicationID: "convex",
    },
  ],
};