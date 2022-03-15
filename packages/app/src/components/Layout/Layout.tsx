import { AppShell, Header, Navbar, Title } from '@mantine/core';
import React, { PropsWithChildren } from 'react';
import { MainLinks } from './_links';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} padding="xs">
            <Navbar.Section>
              <MainLinks />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Header height={60} padding="xs">
            <Title order={3}>Somerville Bike Kitchen</Title>
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : undefined,
          },
        })}
      >
        {children}
      </AppShell>
    </>
  );
}
