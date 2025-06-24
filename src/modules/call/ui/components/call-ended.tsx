"use client"

import { FC } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Routers } from "@/types/routers";

const CallEnded: FC = () => {
  return (
    <div
      className="flex flex-col items-center justify-center h-dvh bg-radial from-sidebar-accent to-sidebar"
    >
      <div
        className="py-4 px-8 flex flex-1 items-center justify-center"
      >
        <div
          className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm"
        >
          <div
            className="flex flex-col gap-y-2 text-center"
          >
            <h6
              className="flex flex-col gap-y-2 text-center"
            >
              You have ended the call
            </h6>
            <p
              className="text-sm"
            >
              Summary will appear in a few minutes
            </p>
          </div>
          <div
            className="flex gap-x-2 justify-between w-full"
          >
            <Button
              asChild
              variant="ghost"
            >
              <Link
                href={Routers.Meetings}
              >
                Cancel
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { CallEnded }