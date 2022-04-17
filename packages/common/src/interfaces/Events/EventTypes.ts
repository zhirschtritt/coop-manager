export const ShiftTermEventTypes = {
  SHIFT_TERM_CREATED: 'shift-term-created',
} as const;

export const ShiftEventTypes = {
  SHIFT_ASSIGNED: 'shift-assigned',
  SHIFT_UNASSIGNED: 'shift-unassigned',
} as const;

export const MemberEventTypes = {
  MEMBER_CREATED: 'member-created',
} as const;

export const MembershipEventTypes = {
  MEMBERSHIP_CREATED: 'membership-created',
  MEMBERSHIP_STARTED: 'membership-started',
} as const;

export const CoopEventTypes = {
  ...ShiftEventTypes,
  ...MemberEventTypes,
  ...MembershipEventTypes,
  ...ShiftTermEventTypes,
} as const;
export type CoopEventType = typeof CoopEventTypes[keyof typeof CoopEventTypes];
