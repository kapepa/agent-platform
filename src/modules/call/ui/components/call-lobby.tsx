"use client"

import { FC } from "react";
import { useCallStateHooks, DefaultVideoPlaceholder, StreamVideoParticipant, VideoPreview, ToggleAudioPreviewButton, ToggleVideoPreviewButton } from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routers } from "@/types/routers";
import { LogInIcon } from "lucide-react";

interface CallLobbyProps {
  onJoin: () => void,
}

const DisabledVideoPreview = () => {
  const { data } = authClient.useSession();

  return (
    <DefaultVideoPlaceholder
      participant={
        {
          name: data?.user.name ?? "",
          image: data?.user.name ?? generateAvatarUri({ seed: data?.user.name ?? "", variant: "initials" }),
        } as StreamVideoParticipant
      }
    />
  )
}

const AllowBrowserPermissions = () => {
  return (
    <p
      className="text-sm"
    >
      Please grant your browser a permission to access your camera and microphone.
    </p>
  )
}

const CallLobby: FC<CallLobbyProps> = (props) => {
  const { onJoin } = props;
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();

  const hasBrowserPermission = hasMicPermission && hasCameraPermission;

  return (
    <div
      className="flex flex-col items-center justify-center h-dvh bg-radial from-sidebar-accent to-sidebar"
    >
      <div
        className="py-4 px-8 flex flex-1 items-center justify-center"
      >
        <div
          className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm"
        >
          <div
            className="flex flex-col gap-y-2 text-center"
          >
            <h6
              className="flex flex-col gap-y-2 text-center"
            >
              Ready to join?
            </h6>
            <p
              className="text-sm"
            >
              Set up your call before joining
            </p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
              hasBrowserPermission
                ? DisabledVideoPreview
                : AllowBrowserPermissions
            }
          />
          <div
            className="flex gap-x-2"
          >
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />
          </div>
          <div
            className="flex gap-x-2 justify-between w-full"
          >
            <Button
              asChild
              variant="ghost"
            >
              <Link
                href={Routers.Meetings}
              >
                Cancel
              </Link>
            </Button>
            <Button
              onClick={onJoin}
            >
              <LogInIcon />
              Join Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CallLobby }