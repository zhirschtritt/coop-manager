import {
  AppShell,
  Burger,
  Flex,
  Header,
  MediaQuery,
  Menu,
  Navbar,
  NavLink,
  Text,
} from '@mantine/core';
import Link from 'next/link';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import React, { PropsWithChildren, useState } from 'react';
import { CheckupList, Friends } from 'tabler-icons-react';

const HEADER_HEIGHT = 40;

export const links = [
  {
    icon: <CheckupList size={16} />,
    color: 'teal',
    label: 'Shifts',
    href: '/shifts',
  },
  {
    icon: <Friends size={16} />,
    color: 'blue',
    label: 'Members',
    href: '/members',
  },
];

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const [opened, { toggle, close }] = useDisclosure(false);
  const [active, setActive] = useState(0);

  const largerThanSm = useMediaQuery('(min-width: 768px)');

  const items = links.map((link, idx) => (
    <NavLink
      {...link}
      active={active === idx}
      component={Link}
      key={link.label}
      onClick={() => {
        setActive(idx);
        close();
      }}
    />
  ));

  return (
    <AppShell
      padding="xs"
      navbarOffsetBreakpoint="sm"
      header={
        <Header height={HEADER_HEIGHT} sx={{ position: largerThanSm ? 'fixed' : 'absolute' }}>
          <Flex justify="flex-start" align="center" h={HEADER_HEIGHT}>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Menu
                onClose={close}
                opened={opened}
                position="bottom-end"
                transition="pop-top-right"
                shadow="md"
              >
                <Menu.Target>
                  <Burger opened={opened} onClick={toggle} size="sm" />
                </Menu.Target>
                <Menu.Dropdown>
                  {items.map((i) => (
                    <Menu.Item key={i.key}>{i}</Menu.Item>
                  ))}
                </Menu.Dropdown>
              </Menu>
            </MediaQuery>

            <Text fw={500} pl={10}>
              Somerville Bike Kitchen
            </Text>
          </Flex>
        </Header>
      }
      navbar={
        <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
          <Navbar width={{ base: 150 }} p="xs" withBorder>
            {items}
          </Navbar>
        </MediaQuery>
      }
      styles={(t) => ({
        main: {
          backgroundColor: t.colors.gray[0],
        },
      })}
    >
      {children}
    </AppShell>
  );
}
