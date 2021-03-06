import type { AppProps } from 'next/app';
import Head from 'next/head';

import { CssBaseline, ThemeProvider } from '@mui/material';
import { darkTheme } from '../themes';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
