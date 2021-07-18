import clsx from 'clsx';
import { FC } from 'react';
import { LinkToIndex } from '@components/links/link-to-index';

import styles from './nav-bar.module.scss';
import { LinkToStories } from '@components/links/link-to-stories';

export type PageType = 'index' | 'user' | 'story' | 'other';

export interface Props {
  active: PageType;
}

export const NavBar: FC<Props> = ({ active }) => {
  return (
    <nav className={styles.root}>
      <ul>
        <li>
          <LinkToIndex className={clsx(active === 'index' && styles.active)} />
        </li>
        <li>
          <LinkToStories
            className={clsx(active === 'story' && styles.active)}
          />
        </li>
      </ul>
    </nav>
  );
};
