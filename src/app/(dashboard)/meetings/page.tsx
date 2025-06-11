import { MeetingsListHeader } from "@/app/modules/meetings/ui/components.tsx/meetings-list-header";
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/app/modules/meetings/ui/views/meetings-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { Routers } from "@/types/routers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsPage: NextPage = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({})
  )

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routers.SignIn)
  }

  return (
    <>
      <MeetingsListHeader />
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
    </>
  )
}

export default MeetingsPage;