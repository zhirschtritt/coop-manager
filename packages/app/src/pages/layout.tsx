import { AppShell, Header, Navbar } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} height={500} padding="xs">
            Some sidebar tab
          </Navbar>
        }
        header={
          <Header height={60} padding="xs">
            Bike Kitchen
          </Header>
        }
        styles={(theme) => ({
          main: {
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </>
  );
}
