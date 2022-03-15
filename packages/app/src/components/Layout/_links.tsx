import React from 'react';
import { Friends } from 'tabler-icons-react';
import { ThemeIcon, UnstyledButton, Group, Text } from '@mantine/core';
import Link from 'next/link';

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  linkTo: string;
}

function MainLink({ icon, color, label, linkTo }: MainLinkProps) {
  return (
    <UnstyledButton
      sx={(theme) => ({
        display: 'block',
        width: '100%',
        padding: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

        '&:hover': {
          backgroundColor:
            theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
        },
      })}
    >
      <Group>
        <ThemeIcon color={color} variant="light">
          {icon}
        </ThemeIcon>
        <Link href={linkTo} passHref>
          <Text component="a" size="sm">
            {label}
          </Text>
        </Link>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <Friends size={16} />,
    color: 'blue',
    label: 'Members',
    linkTo: '/members',
  },
];

export function MainLinks() {
  const links = data.map((link) => <MainLink {...link} key={link.label} />);
  return <div>{links}</div>;
}
