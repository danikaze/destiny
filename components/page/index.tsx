import { FC } from 'react';
import Head from 'next/head';
import { Header } from '@components/header';
import { NavBar, PageType } from '@components/nav-bar';
import { Footer } from '@components/footer';

import styles from './page.module.scss';

export interface Props {
  active: PageType;
  /** Document title to appear as the tab name */
  title: string;
  /** Content for the `<meta name="description">` tag */
  description?: string;
  /** Header at the top of the page */
  header?: string;
  /** Subheader below the Header */
  subHeader?: string;
}

export const Page: FC<Props> = ({
  active,
  title,
  description,
  header,
  subHeader,
  children,
}) => {
  const headerMain = header ? (
    <h1 className={styles.headerMain}>{header}</h1>
  ) : undefined;
  const headerSub = subHeader ? (
    <h2 className={styles.headerSub}>{subHeader}</h2>
  ) : undefined;
  const headerElem =
    headerMain || headerSub ? (
      <div className={styles.header}>
        {headerMain}
        {headerSub}
      </div>
    ) : undefined;
  const desc = description ? (
    <meta name="Description" content={description} />
  ) : undefined;

  return (
    <>
      <Head>
        <title>{title}</title>
        {desc}
        <meta name="theme-color" content="white" />
        <meta name="theme-color" content="white" />
      </Head>
      <div className={styles.root}>
        <Header />
        <NavBar active={active} />
        <div className={styles.central}>
          <main className={styles.main}>
            {headerElem}
            {children}
          </main>
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
};
