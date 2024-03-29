import { TFunction, useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Page } from '@components/page';
import { UserStory, Props as UserStoryProps } from '@components/user-story';

import styles from './user-story.module.scss';

export interface Props {
  story?: UserStoryProps['story'] | null;
  pages?: UserStoryProps['pages'] | null;
}

export const UserStoryPage: FC<Props> = ({ story, pages }) => {
  const { t } = useTranslation('user-stories');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;
  const contents =
    story && pages ? renderStory(story, pages) : renderNoStory(t);
  const header = story && pages ? t('storyPageTitle') : undefined;

  return (
    <Page active="user" title={title} header={header}>
      {contents}
    </Page>
  );
};

function renderNoStory(t: TFunction): JSX.Element {
  return <div>No story found with the provided data.</div>;
}

function renderStory(
  story: UserStoryProps['story'],
  pages: UserStoryProps['pages']
): JSX.Element {
  return <UserStory story={story} pages={pages} />;
}
