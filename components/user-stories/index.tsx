import clsx from 'clsx';
import { FC, ReactNode } from 'react';
import { TFunction } from 'next-i18next';
import { Story } from '@model/story/interface';
import { LinkToUserStory } from '@components/links/link-to-user-story';
import { Icon } from '@components/icon';
import { LinkToRead } from '@components/links/link-to-read';
import { useUserStories } from './hooks';

import styles from './user-stories.module.scss';

type StoryProps = Pick<Story, 'storyId' | 'title' | 'state'>;

export type Props = {
  stories: StoryProps[];
  className?: string;
};

export const UserStories: FC<Props> = ({ className, ...props }) => {
  const { t, stories, deleteStory } = useUserStories(props);
  const storiesElem = stories.length ? (
    <ul className={styles.storyList}>
      {stories.map(storyRenderer(t, deleteStory))}
    </ul>
  ) : (
    renderNoStories(t)
  );

  return <div className={clsx(styles.root, className)}>{storiesElem}</div>;
};

function renderNoStories(t: TFunction): ReactNode {
  return (
    <div>
      {t('noUserStories')}{' '}
      <LinkToUserStory create={true}>
        {t('noUserStoriesCreateOneLink')}
      </LinkToUserStory>
    </div>
  );
}

function storyRenderer(
  t: TFunction,
  deleteStory: (storyId: Story['storyId']) => Promise<void>
) {
  return (story: StoryProps): ReactNode => {
    const { storyId, title } = story;
    const hiddenElem =
      story.state === 'draft' ? (
        <Icon type="view-hide" title={t('draftIconTitle')} />
      ) : null;

    function deleteHandler() {
      deleteStory(storyId);
    }

    return (
      <li key={storyId}>
        <LinkToUserStory
          key={storyId}
          storyId={storyId}
          className={styles.storyTitle}
        >
          {title}
        </LinkToUserStory>
        {hiddenElem}
        <LinkToRead
          storyId={storyId}
          title={t('readButtonTitle')}
          className={styles.storyReadButton}
        >
          <Icon type="book" />
        </LinkToRead>
        <div
          onClick={deleteHandler}
          title={t('deleteButtonTitle')}
          className={styles.storyDeleteButton}
        >
          <Icon type="bin" />
        </div>
      </li>
    );
  };
}
