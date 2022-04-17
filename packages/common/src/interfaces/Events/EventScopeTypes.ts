export const CoopEventScopeTypes = {
  SHIFT: 'shift',
  MEMBER: 'member',
  MEMBERSHIP: 'membership',
  SHIFT_TERM: 'shift-term',
} as const;
export type CoopEventScopeType = typeof CoopEventScopeTypes[keyof typeof CoopEventScopeTypes];
