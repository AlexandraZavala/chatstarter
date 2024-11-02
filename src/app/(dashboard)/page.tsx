"use client";
import {
  AcceptedFriendList,
  PendingFriendList,
} from "./_components/friend-list";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AddFriend } from "./_components/add-friend";


export default function FriendPage() {
  return (
    <div className="flex-1 flex flex-col divide-y">
      <header className="flex items-center justify-between p-4">
        <h1 className="font-bold">Friends</h1>
        <AddFriend/>
      </header>
      <div className="grid p4 gap4">
        <TooltipProvider delayDuration={0}>
          <PendingFriendList />
          <AcceptedFriendList />
        </TooltipProvider>
      </div>
    </div>
  );
}
