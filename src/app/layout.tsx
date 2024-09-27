import type { Metadata } from 'next';

import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';

import { AppWrapper } from '@/components';
import { defaultMetadata } from '@/constants';
import { MuiTheme } from '@/theme';
import './globals.css';
import StoreProvider from './StoreProvider';

export const metadata: Metadata = {
  ...defaultMetadata,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id, in">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={MuiTheme}>
            <StoreProvider>
              <AppWrapper>{children}</AppWrapper>
            </StoreProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
