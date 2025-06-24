import { auth } from "@/lib/auth";
import { CallView } from "@/modules/call/ui/view/call-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { Routers } from "@/types/routers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

interface CallIdPageProps {
  params: Promise<{
    meetingId: string,
  }>
}

const CallIdPage: NextPage<CallIdPageProps> = async (props) => {
  const { params } = props;
  const { meetingId } = await params;
  const session = await auth.api.getSession({
    headers: await headers(),
  });

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
      <CallView
        meetingId={meetingId}
      />
    </HydrationBoundary>
  )
}

export default CallIdPage;