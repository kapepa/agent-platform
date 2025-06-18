"use client"

import { useMeetingsFilters } from "@/app/modules/meetings/hooks/use-meetings-filters";
import { MeetingStatusEnum } from "@/app/modules/meetings/types";
import { CommandSelect } from "@/components/command-select";
import { CircleCheckIcon, CircleXIcon, ClockArrowUpIcon, LoaderIcon, VideoIcon } from "lucide-react";
import { FC } from "react";

const options = [
  {
    id: MeetingStatusEnum.Upcoming,
    value: MeetingStatusEnum.Upcoming,
    children: (
      <div
        className="flex items-center gap-x-2 capitalize"
      >
        <ClockArrowUpIcon />
        {MeetingStatusEnum.Upcoming}
      </div>
    )
  },
  {
    id: MeetingStatusEnum.Completed,
    value: MeetingStatusEnum.Completed,
    children: (
      <div
        className="flex items-center gap-x-2 capitalize"
      >
        <CircleCheckIcon />
        {MeetingStatusEnum.Completed}
      </div>
    )
  },
  {
    id: MeetingStatusEnum.Active,
    value: MeetingStatusEnum.Active,
    children: (
      <div
        className="flex items-center gap-x-2 capitalize"
      >
        <VideoIcon />
        {MeetingStatusEnum.Active}
      </div>
    )
  },
  {
    id: MeetingStatusEnum.Processing,
    value: MeetingStatusEnum.Processing,
    children: (
      <div
        className="flex items-center gap-x-2 capitalize"
      >
        <LoaderIcon />
        {MeetingStatusEnum.Processing}
      </div>
    )
  },
  {
    id: MeetingStatusEnum.Cancelled,
    value: MeetingStatusEnum.Cancelled,
    children: (
      <div
        className="flex items-center gap-x-2 capitalize"
      >
        <CircleXIcon />
        {MeetingStatusEnum.Cancelled}
      </div>
    )
  },
]

const StatusFilter: FC = () => {
  const [fiters, setFilters] = useMeetingsFilters();

  return (
    <CommandSelect
      placeholder="Status"
      className="h-9"
      options={options}
      onSelect={
        (value) => setFilters({ status: value as MeetingStatusEnum })
      }
      value={fiters.status ?? ""}
    />
  )
}

export { StatusFilter }