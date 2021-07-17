import clsx from 'clsx';
import { FC } from 'react';

import styles from './header.module.scss';

export interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  return <header className={clsx(styles.root, className)}>Header</header>;
};
