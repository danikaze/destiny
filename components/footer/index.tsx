import clsx from 'clsx';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

import styles from './footer.module.scss';

export interface Props {
  className?: string;
}

export const Footer: FC<Props> = ({ className }) => {
  const { t } = useTranslation('common');

  return (
    <footer className={clsx(styles.root, className)}>{t('footer')}</footer>
  );
};
