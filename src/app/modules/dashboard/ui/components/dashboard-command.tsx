import { CommandDialog, CommandInput, CommandItem, CommandList, CommandResponsiveDialog } from "@/components/ui/command";
import { Dispatch, FC, SetStateAction } from "react";

interface DashboardCommandProps {
  open: boolean,
  setOpen: Dispatch<SetStateAction<boolean>>
}

const DashboardCommand: FC<DashboardCommandProps> = (props) => {
  const { open, setOpen } = props;

  return (
    <CommandResponsiveDialog
      open={open}
      onOpenChange={setOpen}
    >
      <CommandInput />
      <CommandList>
        <CommandItem>
          Test
        </CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  )
}

export { DashboardCommand }