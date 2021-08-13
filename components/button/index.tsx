import clsx from 'clsx';
import { FC } from 'react';

import styles from './button.module.scss';

export type Props = {
  type?: 'normal' | 'primary' | 'danger';
  onClick?: () => void;
  title?: string;
  disabled?: boolean;
  className?: string;
};

export const Button: FC<Props> = ({
  type,
  onClick,
  title,
  disabled,
  children,
  className,
}) => {
  const classes = clsx(
    styles.root,
    type && styles[type],
    disabled && styles.disabled,
    className
  );

  return (
    <div
      className={classes}
      onClick={(!disabled && onClick) || undefined}
      title={title}
    >
      {children}
    </div>
  );
};
