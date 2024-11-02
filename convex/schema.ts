import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values"; //validate values 

// Convex is a a backend as a service that allows to create your own database schema,
// architecture without having to worry about the server infrastructure, also
// client state management (authentication, authorization, etc)

//it use functions wich run on the backend and are avilabe as api
//there are three types of functions: queries (get data), mutations(write) and actions (call other services)


export default defineSchema({
    users: defineTable({
        image: v.string(),
        username: v.string(),
        clerkId: v.string(),
    }).index("by_clerkId", ["clerkId"]).index("by_username", ["username"]), //for indexation
    messages: defineTable({
        sender: v.string(),
        content: v.string(),
    }),
    friends: defineTable({
        user1:v.id("users"),
        user2: v.id("users"),
        status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("rejected")), //union of literal values 
    })
    .index("by_user1_status", ["user1", "status"])
    .index("by_user2_status", ["user2", "status"])
});

//add package convex-helper: give utilitu funcions