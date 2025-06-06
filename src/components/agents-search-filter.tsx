import { FC } from "react";
import { Input } from "./ui/input";
import { useAgentsFilters } from "@/app/modules/agents/hooks/use-agents-filters";
import { SearchIcon } from "lucide-react";

const AgentsSearchFilter: FC = () => {
  const [filters, setFilters] = useAgentsFilters();
  return (
    <div
      className="relative"
    >
      <Input
        type="text"
        placeholder="Filter by name"
        value={filters.search}
        onChange={(e) => setFilters({ search: e.target.value })}
        className="h-9 bg-white w-[200px] pl-7"
      />
      <SearchIcon
        className="size-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  )
}

export { AgentsSearchFilter }