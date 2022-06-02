import { FC } from 'react';
import Head from 'next/head';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  description: string;
}

export const Layout: FC<Props> = ({title, description, children}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta name="og:title" content={title} />
        <meta name="og:description" content={description} />
      </Head>

      <nav>
        
      </nav>

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>
    </>
  );
};
