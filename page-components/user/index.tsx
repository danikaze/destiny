import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Story } from '@model/story/interface';
import { Page } from '@components/page';
import { Icon } from '@components/icon';
import { UserAccountInfo } from '@components/user-account-info';
import { UserStories } from '@components/user-stories';
import { LinkToUserStory } from '@components/links/link-to-user-story';

import styles from './user.module.scss';

export interface Props {
  stories: Story[];
}

export const UserPage: FC<Props> = ({ stories }) => {
  const { t } = useTranslation('common');
  const { t: tStories } = useTranslation('user-stories');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  return (
    <Page active="user" title={title} header={t('sectionUser')}>
      <UserAccountInfo />
      <h3>{tStories('yourStories')}</h3>
      <LinkToUserStory create={true} className={styles.createStoryButton}>
        <Icon type="plus" /> {tStories('createStoryButton')}
      </LinkToUserStory>
      <UserStories stories={stories} />
    </Page>
  );
};
