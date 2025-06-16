"use client"

import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { FC, useState } from "react";
import { NewMeetingDialog } from "./new-meetings-dialog";

const MeetingsListHeader: FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  return (
    <>
      <NewMeetingDialog
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
            My Meetings
          </h5>
          <Button
            type="button"
            onClick={() => setIsDialogOpen(true)}
          >
            <PlusIcon />
            New Meetings
          </Button>
        </div>
        <div
          className="flex items-center gap-x-2 p-1"
        >

        </div>
      </div>
    </>
  )
}

export { MeetingsListHeader }