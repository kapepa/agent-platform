import { ResponsiveDialog } from "@/components/responsive-dialog";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { MeetingForm } from "./meeting-form";
import { Routers } from "@/types/routers";

interface NewMeetingDialogProps {
  open: boolean,
  onOpenChange: (open: boolean) => void,
}

const NewMeetingDialog: FC<NewMeetingDialogProps> = (props) => {
  const { open, onOpenChange } = props;
  const router = useRouter();

  return (
    <ResponsiveDialog
      open={open}
      title="New Meeting"
      description="Create a new meeting"
      onOpenChange={onOpenChange}
    >
      <MeetingForm
        onSuccess={(id) => {
          router.push(`${Routers.Meetings}/${id}`)
        }}
        onCancel={() => onOpenChange}
      />
    </ResponsiveDialog>
  )
}

export { NewMeetingDialog }