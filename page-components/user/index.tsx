import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Page } from '@components/page';
import { UserAccountInfo } from '@components/user-account-info';

export interface Props {}

export const UserPage: FC<Props> = ({}) => {
  const { t } = useTranslation('common');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  return (
    <Page active="user" title={title} header={t('sectionUser')}>
      <UserAccountInfo />
    </Page>
  );
};
