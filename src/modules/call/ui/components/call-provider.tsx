"use client"

import { authClient } from "@/lib/auth-client";
import { LoaderIcon } from "lucide-react";
import { FC } from "react";
import { CallConnect } from "./call-connect";
import { generateAvatarUri } from "@/lib/avatar";

interface CallProviderProps {
  meetingId: string,
  meetingName: string,
}

const CallProvider: FC<CallProviderProps> = (props) => {
  const { meetingId, meetingName } = props;
  const { data, isPending } = authClient.useSession();

  if (!data || isPending) {
    return (
      <div
        className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar"
      >
        <LoaderIcon
          className="size-6 animate-spin text-white"
        />
      </div>
    )
  }

  return (
    <CallConnect
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={
        data.user.image ??
        generateAvatarUri({ seed: data.user.name, variant: "initials" })
      }
    />
  )
}

export { CallProvider }