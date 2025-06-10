"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react"

const MeetingsView: FC = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));

  return (
    <div>
      {JSON.stringify(data)}
    </div>
  )
};

const MeetingsViewLoading: FC = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds..."
    />
  )
}

const MeetingsViewError: FC = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Please try again later"
    />
  )
}


export { MeetingsView, MeetingsViewLoading, MeetingsViewError }