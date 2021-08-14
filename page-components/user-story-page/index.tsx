import { TFunction, useTranslation } from 'next-i18next';
import { FC } from 'react';

import { Story, StoryPage } from '@model/story/interface';
import { Page } from '@components/page';
import { UserStoryPage } from '@components/user-story-page';

import styles from './user-story.module.scss';

export interface Props {
  story: Story | null;
  page: StoryPage | null;
  pages: Pick<StoryPage, 'pageId' | 'name'>[] | null;
}

export const UserStoryPagePage: FC<Props> = ({ story, page, pages }) => {
  const { t } = useTranslation('user-stories');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;
  const contents =
    story && page && pages ? renderStory(story, page, pages) : renderNoData(t);
  const header = story && page && pages ? t('pagePageTitle') : undefined;

  return (
    <Page active="user" title={title} header={header}>
      {contents}
    </Page>
  );
};

function renderNoData(t: TFunction): JSX.Element {
  return <div>No story or page found with the provided data.</div>;
}

function renderStory(
  story: Story,
  page: StoryPage,
  pages: Pick<StoryPage, 'pageId' | 'name'>[]
): JSX.Element {
  return <UserStoryPage story={story} page={page} pages={pages} />;
}
