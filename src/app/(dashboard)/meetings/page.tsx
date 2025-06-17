import { loadSearchParams } from "@/app/modules/agents/params";
import { MeetingsListHeader } from "@/app/modules/meetings/ui/components/meetings-list-header";
import { MeetingsView, MeetingsViewError, MeetingsViewLoading } from "@/app/modules/meetings/ui/views/meetings-view";
import { auth } from "@/lib/auth";
import { getQueryClient, trpc } from "@/trpc/server";
import { Routers } from "@/types/routers";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SearchParams } from "nuqs";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface MeetingsIdPageProps {
  searchParams: Promise<SearchParams>
}

const MeetingsIdPage: NextPage<MeetingsIdPageProps> = async (props) => {
  const { searchParams } = props;
  const filters = await loadSearchParams(searchParams);
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.meetings.getMany.queryOptions({
      ...filters,
    })
  )

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routers.SignIn)
  }

  return (
    <>
      <HydrationBoundary
        state={dehydrate(queryClient)}
      >
        <Suspense
          fallback={<MeetingsViewLoading />}
        >
          <ErrorBoundary
            fallback={<MeetingsViewError />}
          >
            MeetingsIdPage
          </ErrorBoundary>
        </Suspense>
      </HydrationBoundary>
    </>
  )
}

export default MeetingsIdPage;