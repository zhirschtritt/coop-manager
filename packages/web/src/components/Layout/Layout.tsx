import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Title,
  useMantineTheme,
  Group,
  Center,
} from '@mantine/core';
import Link from 'next/link';
import React, { PropsWithChildren, useState } from 'react';
import { MainLinks } from './_links';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  const theme = useMantineTheme();

  const [opened, setOpened] = useState(false);

  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" hidden={!opened} width={{ sm: 200, lg: 300 }}>
          <Navbar.Section>
            <Center>
              <Link href="/" passHref>
                <Title order={4}>Somerville Bike Kitchen</Title>
              </Link>
            </Center>
          </Navbar.Section>
          <Navbar.Section>
            <MainLinks onClick={() => setOpened(!opened)} />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60}>
          <Group>
            <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
          </Group>
        </Header>
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
