"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client"
import { useSuspenseQuery } from "@tanstack/react-query";
import { FC } from "react"
import { DataTable } from "@/components/data-table";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useRouter } from "next/navigation";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { DataPagination } from "@/components/data-pagination";
import { Routers } from "@/types/routers";

const MeetingsView: FC = () => {
  const trpc = useTRPC();
  const router = useRouter();
  const [filters, setFilters] = useMeetingsFilters();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({
    ...filters,
  }));

  return (
    <div
      className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4"
    >
      <DataTable
        data={data.items}
        columns={columns}
        onRowClick={(row) => router.push(`${Routers.Meetings}/${row.id}`)}
      />
      <DataPagination
        page={filters.page}
        totalPages={data.totalPage}
        onPageChange={(page) => setFilters({ page })}
      />
      {
        data.items.length === 0 && (
          <EmptyState
            title="Create your first meeting"
            description="Schedule a meeting to connet with others. Each meeting lets you collaborate. share ideas, and interact with participants in real time."
          />
        )
      }
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

export { MeetingsView, MeetingsViewLoading, MeetingsViewError };