"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { FC, useState } from "react";
import { NewAgentDialog } from "./new-agent-dialog";
import { useAgentsFilters } from "../../hooks/use-agents-filters";

import { DEFAULT_PAGE } from "@/constants";
import { AgentsSearchFilter } from "./agents-search-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const AgentsListHeader: FC = () => {
  const [filters, setFilters] = useAgentsFilters();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const isAnyFilterModified = !!filters.search;
  const onClearFilters = () => {
    setFilters({
      search: "",
      page: DEFAULT_PAGE,
    })
  };

  return (
    <>
      <NewAgentDialog
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
            My Agents
          </h5>
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon />
            New Agents
          </Button>
        </div>
        <ScrollArea>
          <div
            className="flex items-center gap-x-2 p-1"
          >
            <AgentsSearchFilter />
            {
              isAnyFilterModified
              && (
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={onClearFilters}
                >
                  <XCircleIcon />
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

export { AgentsListHeader }