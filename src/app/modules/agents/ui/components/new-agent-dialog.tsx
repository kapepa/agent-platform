import { ResponsiveDialog } from "@/components/responsive-dialog";
import { FC } from "react";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

const NewAgentDialog: FC<NewAgentDialogProps> = (props) => {
  const { open, onOpenChange } = props;

  return (
    <ResponsiveDialog
      open={open}
      title="New Agent"
      description="Create a new agent"
      onOpenChange={onOpenChange}
    >
      <AgentForm
        onCancel={() => onOpenChange(false)}
        onSuccess={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  )
}

export { NewAgentDialog }