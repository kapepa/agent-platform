"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";

const AgentsView: FC = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions());

  return (
    <div>
      {
        JSON.stringify(data, null, 2)
      }
    </div>
  )
}

const AgentsViewLoading: FC = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds..."
    />
  )
}

const AgentsViewError: FC = () => {
  return (
    <ErrorState
      title="Error loading agents"
      description="Please try again later"
    />
  )
}

export { AgentsView, AgentsViewLoading, AgentsViewError }