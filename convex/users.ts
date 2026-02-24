import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Verify the user is authenticated via Clerk
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Called storeUser without authentication present");
    }

    // 2. Check if the user already exists in our Convex DB
    const user = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      // 3. If they exist, update their profile just in case they changed their picture/name in Clerk
      if (user.name !== identity.name || user.image !== identity.pictureUrl) {
        await ctx.db.patch(user._id, { 
          name: identity.name ?? "Anonymous", 
          image: identity.pictureUrl ?? "" 
        });
      }
      return user._id;
    }

    // 4. If they are a brand new user, insert them into Convex
    return await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      name: identity.name ?? "Anonymous",
      email: identity.email ?? "",
      image: identity.pictureUrl ?? "",
      isOnline: true,
    });
  },
});