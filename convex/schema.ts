import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; //validate values 

export default defineSchema({
    users: defineTable({
        image: v.string(),
        username: v.string(),
        clerkId: v.string(),
    }).index("by_clerkId", ["clerkId"]), //for indexation
    messages: defineTable({
        sender: v.string(),
        content: v.string(),
    }),
});