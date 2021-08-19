import { createRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { callEditStoryApi } from '@api/user-story/client';
import { callDeleteStoryPageApi } from '@api/user-story-page/client';
import { Story, StoryPage, StoryState } from '@model/story/interface';
import { UserAuthData } from '@model/user';
import { useUserData } from '@utils/auth';
import { useLogger } from '@utils/logger';

import { Props, StoryPageProps, StoryProps } from '.';

interface State {
  story: StoryProps;
  pages: StoryPageProps[];
}

export function useUserStory(props: Props) {
  const logger = useLogger('user-stories');
  const { t } = useTranslation('user-stories');
  const user = useUserData()!;
  const [state, setState] = useState<State>(getInitialState(user, props));
  const titleRef = createRef<HTMLInputElement>();
  const stateRef = createRef<HTMLSelectElement>();

  async function saveStory() {
    try {
      const title = titleRef.current!.value;
      await callEditStoryApi(state.story.storyId, {
        title,
        state: state.story.state,
        entryPageId: state.story.entryPageId,
      });
    } catch (error) {
      logger.error(error);
    }
  }

  function titleChangeHandler() {
    setState((state) => ({
      ...state,
      story: {
        ...state.story,
        title: titleRef.current!.value,
      },
    }));
  }

  function stateChangeHandler() {
    setState((state) => ({
      ...state,
      story: {
        ...state.story,
        state: stateRef.current!.value as StoryState,
      },
    }));
  }

  async function deleteStory(
    page: Pick<StoryPage, 'storyId' | 'name' | 'pageId'>
  ) {
    const deleteIt = confirm(t('confirmPageDelete', { name: page.name }));
    if (!deleteIt) return;

    await callDeleteStoryPageApi(page.storyId, page.pageId);

    const pages = [...state.pages];
    const index = pages.findIndex((p) => p.pageId === page.pageId);
    if (index === -1) return;

    pages.splice(index, 1);
    setState((state) => ({
      ...state,
      pages,
    }));
  }

  return {
    t,
    saveStory,
    deleteStory,
    titleChangeHandler,
    stateChangeHandler,
    titleRef,
    stateRef,
    story: state.story,
    pages: state.pages,
  };
}

function getInitialState(user: UserAuthData, props: Props) {
  const { story, pages } = props;

  return story && pages
    ? { story, pages }
    : {
        story: {
          title: '',
          authorUserId: user.userId,
        } as Story,
        pages: [],
      };
}
