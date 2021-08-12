import { createRef, useState } from 'react';
import { Story, StoryPage, StoryState } from '@model/story/interface';
import { UserAuthData } from '@model/user';
import { useUserData } from '@utils/auth';
import { callEditStoryApi } from '@api/user-story/client';
import { Props } from '.';

interface State {
  story: Story;
  pages: StoryPage[];
}

export function useUserStory(props: Props) {
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
      console.error(error);
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

  return {
    saveStory,
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
