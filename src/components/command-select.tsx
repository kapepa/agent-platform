import { FC, ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommandEmpty, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "./ui/command";

interface CommandSelectProps {
  options: Array<{
    id: string,
    value: string,
    children: ReactNode,
  }>,
  onSelect: (value: string) => void,
  onSearch?: (value: string) => void,
  value: string,
  placeholder?: string,
  isSearchable?: boolean,
  className?: string,
}

const CommandSelect: FC<CommandSelectProps> = (props) => {
  const { value, options, onSelect, onSearch, className, placeholder = "Select an options", isSearchable } = props;
  const [open, setOpen] = useState<boolean>(false);
  const selectOption = options.find((option) => option.value === value);

  const handleOpenChange = (open: boolean) => {
    onSearch?.("");
    setOpen(open);
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectOption && "text-muted-foreground",
          className,
        )}
        onClick={() => setOpen(true)}
      >
        <div>
          {
            selectOption?.children ?? placeholder
          }
        </div>
        <ChevronDownIcon />
      </Button>
      <CommandResponsiveDialog
        open={open}
        onOpenChange={handleOpenChange}
        shouldFilter={!onSearch}
      >
        <CommandInput
          placeholder="Search..."
          onValueChange={onSearch}
        />
        <CommandList>
          <CommandEmpty>
            <span
              className="text-muted-foreground text-sm"
            >
              no option found
            </span>
          </CommandEmpty>
          {
            options.map((option, index) => (
              <CommandItem
                key={`${option.id}-${index}`}
                onSelect={() => {
                  onSelect(option.value);
                  setOpen(false)
                }}
              >
                {option.children}
              </CommandItem>
            ))
          }
        </CommandList>
      </CommandResponsiveDialog>
    </>
  )
}

export { CommandSelect }