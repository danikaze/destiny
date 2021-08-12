import clsx from 'clsx';
import { FC } from 'react';
import { Story, StoryPage, StoryState } from '@model/story/interface';

import styles from './user-story.module.scss';
import { useUserStory } from './hooks';
import { useTranslation } from 'next-i18next';

export type Props = {
  story: Story;
  pages: StoryPage[];
  className?: string;
};

export const UserStory: FC<Props> = ({ className, ...props }) => {
  const {
    story,
    pages,
    titleRef,
    stateRef,
    saveStory,
    titleChangeHandler,
    stateChangeHandler,
  } = useUserStory(props);
  const { t } = useTranslation('user-stories');

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
      {renderPages(pages)}
    </div>
  );
};

function renderPages(pages: StoryPage[]) {
  const pageList = pages.map((page) => <li key={page.pageId}>{page.name}</li>);
  return (
    <>
      <h3>Pages</h3>
      <ul>{pageList}</ul>
    </>
  );
}
