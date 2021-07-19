import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToUser: FC<Props> = ({ className, children }) => {
  const { t } = useTranslation('common');

  return (
    <Link href="/user">
      <a className={className}>{children || t('sectionUser')}</a>
    </Link>
  );
};
