import { ResponsiveDialog } from "@/components/responsive-dialog";
import { FC } from "react";
import { AgentForm } from "./agent-form";
import { AgentGetOne } from "../../types";

interface UpdateAgentDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  initialValues: AgentGetOne,
}

const UpdateAgentDialog: FC<UpdateAgentDialogProps> = (props) => {
  const { open, onOpenChange, initialValues } = props;

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
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}

export { UpdateAgentDialog }