import { AppShell, Header, Navbar, Title } from '@mantine/core';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import { MainLinks } from './_links';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <AppShell
        padding="md"
        navbarOffsetBreakpoint="sm"
        navbar={
          <Navbar width={{ sm: 200, lg: 300 }} hiddenBreakpoint="sm">
            <Navbar.Section>
              <MainLinks />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Link href="/" passHref>
            <Header height={60}>
              <Title order={3}>Somerville Bike Kitchen</Title>
            </Header>
          </Link>
        }
        styles={(theme) => ({
          main: {
            backgroundColor: theme.colors.gray[0],
          },
        })}
      >
        {children}
      </AppShell>
    </>
  );
}
