import { customCtx, customQuery, customMutation } from "convex-helpers/server/customFunctions";
import { getCurrentUser } from "./user";
import { query, mutation } from "../_generated/server";

//context: conjunto de información disponbles para una o más funciones en su ejecución
// ctx

//custom query for authentication
export const authenticatedQuery = customQuery(
  //define convez context
  query,
  customCtx(async (ctx) => {
    //custonCtx is a function that allows to create a personalized context
    //get current user
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unathorized");
    }
    return { user };
  })
);

export const authenticatedMutation = customMutation(
  mutation,
  customCtx(async (ctx) => {
    const user = await getCurrentUser(ctx);
    if (!user) {
      throw new Error("Unathorized");
    }
    return { user };
  })
);
