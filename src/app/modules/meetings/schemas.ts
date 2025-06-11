import { meetingStatus } from "@/db/schema";
import { z } from "zod";

export const meetingStatusValues = meetingStatus.enumValues;

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  agentId: z.string().min(1, { message: "Agent is required" }),
  status: z.enum(meetingStatusValues),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "Id is required" })
})