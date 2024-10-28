"use client";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/nextjs";

//create a new convex client to interact with the Convex backend
const client = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

//component that wraps the children with the convex client

export function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConvexProviderWithClerk client={client} useAuth={useAuth}>
      {children}
    </ConvexProviderWithClerk>
  );
}
