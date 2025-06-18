import { MeetingIdView, MeetingsIdViewError, MeetingsIdViewLoading } from "@/app/modules/meetings/ui/views/meeting-id-view";
import { MeetingsView } from "@/app/modules/meetings/ui/views/meetings-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { Routers } from "@/types/routers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface MeetingIdPageProps {
  params: Promise<{
    meetingId: string,
  }>
}

const MeetingIdPage: NextPage<MeetingIdPageProps> = async (props) => {
  const { params } = props;
  const { meetingId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect(Routers.SignIn)
  }

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  )

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Suspense
        fallback={<MeetingsIdViewLoading />}
      >
        <ErrorBoundary
          fallback={<MeetingsIdViewError />}
        >
          <MeetingIdView
            meetingId={meetingId}
          />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default MeetingIdPage;