"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { FC, useState } from "react";
import { NewMeetingDialog } from "./new-meetings-dialog";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { StatusFilter } from "@/components/status-filter";
import { AgentIdFilters } from "./agent-id-filters";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DEFAULT_PAGE } from "@/constants";

const MeetingsListHeader: FC = () => {
  const [filters, setFilters] = useMeetingsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const isAnyFiltersModified = !!filters.status || !!filters.search || !!filters.agentId;

  const onClearFilters = () => {
    setFilters({
      status: null,
      agentId: "",
      search: "",
      page: DEFAULT_PAGE,
    })
  }

  return (
    <>
      <NewMeetingDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
      <div
        className="py-4 px-4 md:px-8 flex flex-col gap-y-4"
      >
        <div
          className="flex items-center justify-between"
        >
          <h5
            className="font-medium"
          >
            My Meetings
          </h5>
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon />
            New Meetings
          </Button>
        </div>
        <ScrollArea>
          <div
            className="flex items-center gap-x-2 p-1"
          >
            <MeetingsSearchFilter />
            <StatusFilter />
            <AgentIdFilters />
            {
              isAnyFiltersModified && (
                <Button
                  variant="outline"
                  onClick={onClearFilters}
                >
                  <XCircleIcon
                    className="size-4"
                  />
                  Clear
                </Button>
              )
            }
          </div>
          <ScrollBar
            orientation="horizontal"
          />
        </ScrollArea>
      </div>
    </>
  )
}

export { MeetingsListHeader }