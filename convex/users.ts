import { query } from "./_generated/server";
import { v } from "convex/values";

export const getUsers = query({
  args: { searchTerm: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    let users = await ctx.db.query("users").collect();
    
    // Filter out the current logged-in user
    users = users.filter((u) => u.tokenIdentifier !== identity.tokenIdentifier);

    // Filter by search term if provided
    if (args.searchTerm) {
      const term = args.searchTerm.toLowerCase();
      users = users.filter((u) => u.name.toLowerCase().includes(term));
    }

    return users;
  },
});