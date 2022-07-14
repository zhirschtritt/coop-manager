import { AppShell, Header, Navbar, Title, UnstyledButton } from '@mantine/core';
import Link from 'next/link';
import React, { PropsWithChildren } from 'react';
import { MainLinks } from './_links';

export default function Layout({ children }: PropsWithChildren<unknown>) {
  return (
    <>
      <AppShell
        padding="md"
        navbar={
          <Navbar width={{ base: 300 }} padding="xs">
            <Navbar.Section>
              <MainLinks />
            </Navbar.Section>
          </Navbar>
        }
        header={
          <Link href="/" passHref>
            <UnstyledButton>
              <Header height={60} padding="xs">
                <Title order={3}>Somerville Bike Kitchen</Title>
              </Header>
            </UnstyledButton>
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
