'use client' // Only works in client components

import { parseAsInteger, parseAsString, useQueryStates, parseAsStringEnum } from 'nuqs'
import { DEFAULT_PAGE } from '@/constants';
import { MeetingStatusEnum } from '../types';

export const useMeetingsFilters = () => {
  return useQueryStates({
    search: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
    page: parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({ clearOnDefault: true }),
    status: parseAsStringEnum(Object.values(MeetingStatusEnum)),
    agentId: parseAsString.withDefault("").withOptions({ clearOnDefault: true }),
  })
}