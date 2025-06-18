import { ResponsiveDialog } from "@/components/responsive-dialog";
import { FC } from "react";
import { MeetingForm } from "./meeting-form";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
  initialValues: MeetingGetOne,
}

const UpdateMeetingDialog: FC<UpdateMeetingDialogProps> = (props) => {
  const { open, onOpenChange, initialValues } = props;

  return (
    <ResponsiveDialog
      open={open}
      title="Edit Meeting"
      description="Edit the meeting details"
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          onOpenChange(false)
        }}
        onCancel={() =>
          onOpenChange(false)
        }
        initialValues={initialValues}
      />
    </ResponsiveDialog>
  )
}

export { UpdateMeetingDialog }