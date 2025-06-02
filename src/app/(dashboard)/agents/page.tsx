import { AgentsView, AgentsViewError, AgentsViewLoading } from "@/app/modules/agents/ui/views/agents-view";
import { ErrorBoundary } from "react-error-boundary";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { FC, Suspense } from "react";

const AgentsPage: FC = async () => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.agents.getMany.queryOptions());

  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Suspense
        fallback={<AgentsViewLoading />}
      >
        <ErrorBoundary
          fallback={<AgentsViewError />}
        >
          <AgentsView />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default AgentsPage;