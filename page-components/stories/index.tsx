import { TFunction, useTranslation } from 'next-i18next';
import { FC } from 'react';
import { Page } from '@components/page';
import { Story } from '@model/story/interface';
import { LinkToRead } from '@components/links/link-to-read';
import { ListItem } from '@components/list-item';

import styles from './stories.module.scss';
import { useStoriesPage } from './hooks';

export interface Props {
  stories: Story[];
}

export const StoriesPage: FC<Props> = (props) => {
  const { t } = useTranslation('common');
  const { stories, removeClientPageMarker } = useStoriesPage(props);
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;

  const storyList = stories.map(
    storyRenderer(useTranslation('stories').t, removeClientPageMarker)
  );

  return (
    <Page active="story" title={title} header={t('sectionStories')}>
      <ul className={styles.storyList}>{storyList}</ul>
    </Page>
  );
};

function storyRenderer(
  t: TFunction,
  removeClientPageMarker: (storyId: Story['storyId']) => void
) {
  return (story: Story): JSX.Element => {
    const actions = [];
    if (story.lastPageId) {
      const clickHandler = () => removeClientPageMarker(story.storyId);
      actions.push(
        <div
          key="deleteMarker"
          className={styles.deletePageMarker}
          title={t('deletePageMarker')}
          onClick={clickHandler}
        >
          ✖
        </div>
      );
    }

    return (
      <ListItem key={story.storyId} actions={actions}>
        <LinkToRead storyId={story.storyId} fromPageId={story.lastPageId}>
          {story.title}
        </LinkToRead>
      </ListItem>
    );
  };
}
