import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import styles from './header.module.scss';

export interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');

  return (
    <header className={clsx(styles.root, className)}>{t('pageName')}</header>
  );
};
