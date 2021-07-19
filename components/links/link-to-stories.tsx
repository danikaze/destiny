import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToStories: FC<Props> = ({ className, children }) => {
  const { t } = useTranslation('common');

  return (
    <Link href="/stories">
      <a className={className}>{children || t('sectionStories')}</a>
    </Link>
  );
};
