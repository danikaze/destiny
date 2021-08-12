import clsx from 'clsx';
import { FC } from 'react';
import { useUserData } from '@utils/auth';

import styles from './user-account-info.module.scss';
import { useTranslation } from 'next-i18next';

export type Props = {
  className?: string;
};

export const UserAccountInfo: FC<Props> = ({ className }) => {
  const user = useUserData();
  const { t } = useTranslation('user');

  if (!user) return null;

  return (
    <div className={clsx(styles.root, className)}>
      {t('username')}: {user.username}
    </div>
  );
};
