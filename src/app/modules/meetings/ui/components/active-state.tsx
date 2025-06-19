"use client"

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Routers } from "@/types/routers";
import { VideoIcon } from "lucide-react";
import Link from "next/link";
import { FC } from "react";

interface ActiveStateProps {
  meetingId: string,
  isCancelling: boolean,
}

const ActiveState: FC<ActiveStateProps> = (props) => {
  const { meetingId, isCancelling } = props;

  return (
    <div
      className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center"
    >
      <EmptyState
        image="/upcoming.svg"
        title="Meeting is active"
        description="Meeting will end once all participants have left"
      />
      <div
        className="flex flex-col-reverse lg:flex-row lg:justify-center items-center gap-2 w-full"
      >
        <Button
          asChild
          disabled={isCancelling}
          className="w-full lg:w-auto"
        >
          <Link
            href={`${Routers.Call}/${meetingId}`}
          >
            <VideoIcon />
            Join meeting
          </Link>
        </Button>
      </div>
    </div>
  )
}

export { ActiveState }