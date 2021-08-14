import clsx from 'clsx';
import { FC } from 'react';
import { TFunction } from 'next-i18next';

import { Story, StoryPage, StoryState } from '@model/story/interface';
import { LinkToUserStoryPage } from '@components/links/link-to-user-story-page';
import { ListItem } from '@components/list-item';

import { useUserStory } from './hooks';
import styles from './user-story.module.scss';
import { Icon } from '@components/icon';

export type Props = {
  story: Story;
  pages: StoryPage[];
  className?: string;
};

export const UserStory: FC<Props> = ({ className, ...props }) => {
  const {
    t,
    story,
    pages,
    titleRef,
    stateRef,
    saveStory,
    deleteStory,
    titleChangeHandler,
    stateChangeHandler,
  } = useUserStory(props);

  return (
    <div className={clsx(styles.root, className)}>
      {t('storyTitle')}:{' '}
      <input
        defaultValue={story.title}
        ref={titleRef}
        onChange={titleChangeHandler}
      />
      <select ref={stateRef} value={story.state} onChange={stateChangeHandler}>
        <option value={StoryState.DRAFT}>{t('storyStateDraft')}</option>
        <option value={StoryState.PUBLISHED}>{t('storyStatePublished')}</option>
      </select>
      <button onClick={saveStory}>Save</button>
      {renderPages(t, story, pages, deleteStory)}
    </div>
  );
};

function renderPages(
  t: TFunction,
  story: Story,
  pages: StoryPage[],
  deleteStory: (page: StoryPage) => void
) {
  const pageList = pages.map((page) => {
    const deleteHandler = () => deleteStory(page);
    const deleteAction = (
      <Icon
        type="bin"
        key="delete"
        title={t('deleteStoryTitle')}
        onClick={deleteHandler}
      />
    );
    const actions = [deleteAction];

    return (
      <ListItem key={page.pageId} actions={actions}>
        <LinkToUserStoryPage storyId={page.storyId} pageId={page.pageId}>
          {page.name}
        </LinkToUserStoryPage>
      </ListItem>
    );
  });

  return (
    <>
      <h3>Pages</h3>
      <LinkToUserStoryPage
        className={styles.createPageButton}
        storyId={story.storyId}
        create={true}
      >
        <Icon type="plus" /> {t('createPageButton')}
      </LinkToUserStoryPage>
      <ul>{pageList}</ul>
    </>
  );
}
