"use client"

import { EmptyState } from "@/components/empty-state";
import { FC } from "react";

const CancelledState: FC = () => {
  return (
    <div
      className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center"
    >
      <EmptyState
        image="/cancelled.svg"
        title="Meeting cancelled"
        description="This meeting was canceled"
      />
    </div>
  )
}

export { CancelledState }