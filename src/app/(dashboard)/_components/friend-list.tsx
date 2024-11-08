import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CheckIcon, MessageCircleIcon, XIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";

export function PendingFriendList() {
  const friends = useQuery(api.functions.friend.listPending);
  const updateStatus = useMutation(api.functions.friend.updateStatus);
  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Pending Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>
          You don´t have any pending friend requests.
        </FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <FriendItem
          key={index}
          username={friend.user.username}
          image={friend.user.image}
        >
          <IconButton
            title="Accept Friend"
            icon={<CheckIcon />}
            className="bg-green-100"
            onClick={() => updateStatus({ id: friend._id, status: "accepted" })}
          />
          <IconButton
            title="Reject Friend"
            icon={<XIcon />}
            className="bg-red-100"
            onClick={() => updateStatus({ id: friend._id, status: "rejected" })}
          />
        </FriendItem>
      ))}
    </div>
  );
}

export function AcceptedFriendList() {
  const friends = useQuery(api.functions.friend.listAccepted);
  const updateStatus = useMutation(api.functions.friend.updateStatus);

  return (
    <div className="flex flex-col divide-y">
      <h2 className="text-xs font-medium text-muted-foreground p-2.5">
        Accepted Friends
      </h2>
      {friends?.length === 0 && (
        <FriendListEmpty>You don´t have any friends yet</FriendListEmpty>
      )}
      {friends?.map((friend, index) => (
        <FriendItem
          key={index}
          username={friend.user.username}
          image={friend.user.image}
        > 
          <StartDMButton friendId={friend.user._id} />
          <IconButton
            title="Remove friend"
            icon={<XIcon />}
            className="bg-red-100"
            onClick={() => updateStatus({ id: friend._id, status: "rejected" })}
          />
        </FriendItem>
      ))}
    </div>
  );
}

function StartDMButton({ friendId }: { friendId: Id<"users"> }) {
  const router = useRouter();
  const idDm = useQuery(api.functions.dm.listOne, { idFriend: friendId });
  return (
    <IconButton
      title="Start DM"
      icon={<MessageCircleIcon />}
      onClick={() => {
        if (!idDm) {
          toast.error("You have to start a conversation first");
          return;
        }else{
          router.push(`/dms/${idDm}`);
        }
        
      }}
    />
  );
}

function FriendItem({
  username,
  image,
  children,
}: {
  username: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between p-2.5 gap-2.5">
      <div className="flex items-center  gap-2.5">
        <Avatar className="size-9 border">
          <AvatarImage src={image} />
          <AvatarFallback />
        </Avatar>
        <p className="text-sm font-medium">{username}</p>
      </div>
      <div className="flex items-center gap-1">{children}</div>
    </div>
  );
}

function FriendListEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-4 bg-muted/5 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

function IconButton({
  title,
  className,
  icon,
  onClick,
}: {
  title: string;
  className?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          className={cn("rounded-full", className)}
          variant="outline"
          size="icon"
          onClick={onClick}
        >
          {icon}
          <span className="sr-only">{title}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>{title}</TooltipContent>
    </Tooltip>
  );
}
