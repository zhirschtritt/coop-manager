import React from 'react';
import { Badge } from '@mantine/core';

interface MembershipBadgeProps {
  level: string;
}

export default function MembershipBadge({ level }: MembershipBadgeProps): JSX.Element {
  const levelToGradient: Record<string, { from: string; to: string }> = {
    staff: { from: 'indigo', to: 'cyan' },
    volunteer: { from: 'teal', to: 'lime' },
    member: { from: 'orange', to: 'red' },
  };

  const gradient = levelToGradient[level];

  return (
    <Badge variant={gradient ? 'gradient' : 'gradient'} gradient={gradient}>
      {level}
    </Badge>
  );
}
