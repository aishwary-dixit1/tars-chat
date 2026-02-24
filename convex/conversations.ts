import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const getOrCreateConversation = mutation({
  args: { otherUserId: v.id("users") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    // 1. Find the current user's Convex ID
    const currentUser = await ctx.db
      .query("users")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
      .unique();

    if (!currentUser) throw new Error("User not found");

    // 2. Find all conversations the current user is in
    const currentUserMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_userId", (q) => q.eq("userId", currentUser._id))
      .collect();

    // 3. Find all conversations the other user is in
    const otherUserMemberships = await ctx.db
      .query("conversationMembers")
      .withIndex("by_userId", (q) => q.eq("userId", args.otherUserId))
      .collect();

    // 4. Find the intersection (conversations they share)
    const currentUserConvIds = currentUserMemberships.map((m) => m.conversationId);
    const otherUserConvIds = otherUserMemberships.map((m) => m.conversationId);
    const commonConvIds = currentUserConvIds.filter(id => otherUserConvIds.includes(id));

    // 5. Check if any of these shared conversations are 1-on-1s
    for (const convId of commonConvIds) {
      const conv = await ctx.db.get(convId);
      if (conv && !conv.isGroup) {
        return convId; // Found existing 1-on-1, return its ID
      }
    }

    // 6. If no 1-on-1 exists, create a new one
    const newConvId = await ctx.db.insert("conversations", {
      isGroup: false,
    });

    // 7. Add both users to the new conversation
    await ctx.db.insert("conversationMembers", {
      conversationId: newConvId,
      userId: currentUser._id,
    });

    await ctx.db.insert("conversationMembers", {
      conversationId: newConvId,
      userId: args.otherUserId,
    });

    return newConvId;
  }
});