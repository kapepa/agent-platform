import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/app/modules/meetings/ui/views/meetings-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


const MeetingsPage: NextPage = () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Suspense
        fallback={<MeetingsViewLoading />}
      >
        <ErrorBoundary
          fallback={<MeetingsViewError />}
        >
          <MeetingsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default MeetingsPage;