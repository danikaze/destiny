import { useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Page } from '@components/page';
import { Story } from '@model/story/interface';
import { LinkToRead } from '@components/links/link-to-read';

import styles from './stories.module.scss';

export interface Props {
  stories: Story[];
}

export const StoriesPage: FC<Props> = ({ stories }) => {
  const { t } = useTranslation('common');
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  return (
    <Page active="story" title={title} header={t('sectionStories')}>
      <ul className={styles.storyList}>{stories.map(renderStory)}</ul>
    </Page>
  );
};

function renderStory(story: Story): JSX.Element {
  return (
    <LinkToRead storyId={story.storyId} key={story.storyId}>
      <li>{story.title}</li>
    </LinkToRead>
  );
}
