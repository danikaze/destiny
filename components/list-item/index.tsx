import clsx from 'clsx';
import { createElement, ReactNode, PropsWithChildren, ReactHTML } from 'react';

import styles from './list-item.module.scss';

export type Props = PropsWithChildren<{
  nodeType?: keyof ReactHTML;
  actions?: ReactNode[];
  className?: string;
}>;

export function ListItem({
  nodeType,
  actions,
  children,
  className,
}: Props): JSX.Element {
  const main = (
    <div key="main" className={styles.main}>
      {children}
    </div>
  );

  return createElement(
    nodeType || 'li',
    {
      className: clsx(styles.root, className),
    },
    [main, actions]
  );
}
