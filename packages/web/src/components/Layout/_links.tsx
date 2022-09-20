import React from 'react';
import { Friends, CheckupList } from 'tabler-icons-react';
import { Text, Button, Stack } from '@mantine/core';
import { NextLink } from '@mantine/next';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  linkTo: string;
  onClick: () => void;
}

function MainLink({ icon, color, label, linkTo, onClick }: MainLinkProps) {
  return (
    <Button
      component={NextLink}
      href={linkTo}
      variant="subtle"
      color={color}
      leftIcon={icon}
      onClick={onClick}
    >
      <Text size="sm">{label}</Text>
    </Button>
  );
}

const data = [
  {
    icon: <Friends size={16} />,
    color: 'blue',
    label: 'Members',
    linkTo: '/members',
  },
  {
    icon: <CheckupList size={16} />,
    color: 'teal',
    label: 'Shifts',
    linkTo: '/shifts',
  },
];

export function MainLinks({ onClick }: { onClick: () => void }) {
  const links = data.map((link) => <MainLink onClick={onClick} {...link} key={link.label} />);
  return <Stack align="start">{links}</Stack>;
}
