import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { Page } from '@components/page';

export type Props = {};

export const IndexPage: FC<Props> = () => {
  const { t } = useTranslation('common');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  return <Page active="index" title={title} header={t('sectionIndex')} />;
};
