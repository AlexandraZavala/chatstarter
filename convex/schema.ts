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
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_username", ["username"]), //for indexation
  directMessages: defineTable({}),
  directMessageMembers: defineTable({
    directMessage: v.id("directMessages"),
    user: v.id("users"),
  })
    .index("by_user", ["user"])
    .index("by_direct_messages", ["directMessage"])
    .index("by_direct_messages_user", ["directMessage", "user"]),
  messages: defineTable({
    sender: v.id("users"),
    content: v.string(),
    directMessage: v.id("directMessages"),
    attachment: v.optional(v.id("_storage")),//storage id that convex gives us
    deleted: v.optional(v.boolean()),
    deletedReason: v.optional(v.string()),
  }).index("by_direct_message", ["directMessage"]),
  friends: defineTable({
    user1: v.id("users"),
    user2: v.id("users"),
    status: v.union(
      v.literal("pending"),
      v.literal("accepted"),
      v.literal("rejected")
    ), //union of literal values
  })
    .index("by_user1_status", ["user1", "status"])
    .index("by_user2_status", ["user2", "status"]),
    typingIndicators: defineTable({
      user: v.id("users"),
      directMessage: v.id("directMessages"),
      expiresAt: v.number(),
    }).index("by_direct_message", ["directMessage"])
    .index("by_user_direct_message", ["user", "directMessage"]),
});

//add package convex-helper: give utilitu funcions
