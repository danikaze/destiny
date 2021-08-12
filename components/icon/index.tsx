import clsx from 'clsx';
import { FC } from 'react';

import styles from './icon.module.scss';

export type IconType = 'view-hide' | 'bin' | 'book' | 'plus';

export interface Props {
  type: IconType;
  title?: string;
  onClick?: () => void;
  className?: string;
}

export const Icon: FC<Props> = ({ type, title, onClick, className }) => {
  const iconClass = styles[`icon-${type}`];
  return (
    <span
      className={clsx(iconClass, className)}
      title={title}
      onClick={onClick}
    />
  );
};
