"use client"

import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import { useMutation, useQueryClient, useSuspenseQuery } from "@tanstack/react-query";
import { FC, useState } from "react";
import { MeetingIdViewHeader } from "../components/meeting-id-view-header";
import { useRouter } from "next/navigation";
import { Routers } from "@/types/routers";
import { toast } from "sonner";
import { useConfirm } from "@/hooks/use-confirm";
import { UpdateMeetingDialog } from "../components/update-meetings-dialog";
import { UpcomingState } from "../components/upcoming-state";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { ProcessingState } from "../components/processing-state";

interface MeetingIdViewProps {
  meetingId: string,
}

const MeetingIdView: FC<MeetingIdViewProps> = (props) => {
  const { meetingId } = props;
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateMeetingDialogOpen, setUpdateMeetingDialogOpen] = useState<boolean>(false)
  const { data } = useSuspenseQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  const [RemoveConfirmation, comfirmRemove] = useConfirm(
    "Are you sure?",
    "The following action will remove this meetings"
  );

  const isActive = data.status === "active";
  const isUpcomming = data.status === "upcoming";
  const isCancelled = data.status === "cancelled";
  const isCompleted = data.status === "completed";
  const isProcessing = data.status === "processing";

  const removeMeeting = useMutation(
    trpc.meetings.remove.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        router.push(Routers.Meetings)
      },
    })
  )

  const handlerRemoveMeeting = async () => {
    const ok = await comfirmRemove();
    if (!ok) return;

    await removeMeeting.mutateAsync({ id: meetingId })
  }

  return (
    <>
      <RemoveConfirmation />
      <UpdateMeetingDialog
        open={updateMeetingDialogOpen}
        onOpenChange={setUpdateMeetingDialogOpen}
        initialValues={data}
      />
      <div
        className="flex-1 py-4 md:px-8 flex flex-col gap-y-4"
      >
        <MeetingIdViewHeader
          meetingId={meetingId}
          meetingName={data.name}
          onEdit={() => setUpdateMeetingDialogOpen(true)}
          onRemove={handlerRemoveMeeting}
        />
        {isCancelled && (
          <CancelledState />
        )}
        {isProcessing && (
          <ProcessingState />
        )}
        {isCompleted && <div>Completed</div>}
        {isActive && (
          <ActiveState
            meetingId={meetingId}
            isCancelling={false}
          />
        )}
        {isUpcomming && (
          <UpcomingState
            meetingId={meetingId}
            isCancelling={false}
            onCancelMeeting={() => { }}
          />
        )}
      </div>
    </>
  )
}

const MeetingsIdViewLoading: FC = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds..."
    />
  )
}

const MeetingsIdViewError: FC = () => {
  return (
    <ErrorState
      title="Error loading meetings"
      description="Please try again later"
    />
  )
}

export { MeetingIdView, MeetingsIdViewLoading, MeetingsIdViewError }