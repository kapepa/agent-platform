import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Routers } from "@/types/routers";
import { ChevronRightIcon, MoreVerticalIcon, PencilIcon, TrashIcon } from "lucide-react";
import { FC } from "react";

interface AgentIdViewHeaderProps {
  agentId: string,
  agentName: string,
  onEdit: () => void,
  onRemove: () => void,
}

const AgentIdViewHeader: FC<AgentIdViewHeaderProps> = (props) => {
  const { agentId, onEdit, onRemove, agentName } = props;

  return (
    <div
      className="flex items-center justify-between"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={Routers.Agents}
            >
              Agents
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator
            className="text-foreground text-xl font-medium [&>svg]: size-4"
          >
            <ChevronRightIcon />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`${Routers.Agents}/${agentId}`}
            >
              {agentName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DropdownMenu
        modal={false}
      >
        <DropdownMenuTrigger
          asChild
        >
          <Button
            type="button"
            variant="ghost"
          >
            <MoreVerticalIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
        >
          <DropdownMenuItem
            onClick={onEdit}
          >
            <PencilIcon
              className="size-4 text-black"
            />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={onRemove}
          >
            <TrashIcon
              className="size-4 text-black"
            />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { AgentIdViewHeader }