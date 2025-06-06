import { AgentIdView, AgentsIdViewError, AgentsIdViewLoading } from "@/app/modules/agents/ui/views/agent-id-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { NextPage } from "next";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface AgentIdPageProps {
  params: Promise<{ agentId: string }>
}

const AgentIdPage: NextPage<AgentIdPageProps> = async (props) => {
  const { params } = props;
  const { agentId } = await params;

  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  )
  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <Suspense
        fallback={<AgentsIdViewLoading />}
      >
        <ErrorBoundary
          fallback={<AgentsIdViewError />}
        >
          <AgentIdView
            agentId={agentId}
          />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  )
}

export default AgentIdPage;