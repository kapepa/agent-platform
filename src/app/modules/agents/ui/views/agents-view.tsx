"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react";
import { DataTable } from "../components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilters } from "../../hooks/use-agents-filters";
import { DataPagination } from "../components/data-pagination";

const AgentsView: FC = () => {
  const trpc = useTRPC();
  const [filters, setFilters] = useAgentsFilters();
  const { data } = useSuspenseQuery(trpc.agents.getMany.queryOptions({
    ...filters
  }));

  return (
    <div
      className="flex-1 pb-4 md:px-8 flex flex-col gap-y-4"
    >
      <DataTable
        data={data.items}
        columns={columns}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPage}
        onPageChange={(page) => setFilters({ page })}
      />
      {
        data.items.length === 0
        && (
          <EmptyState
            title="Create your first agent"
            description="Create an angent to join your meeting. Each agent will follow your instructions and can interact with participants during the call."
          />
        )
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