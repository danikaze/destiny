import { useState } from 'react';
import { StoryPage } from '@model/story/interface';
import { mockStoryPages } from '@model/story/mock';
import { Props } from '.';
import { callChooseStoryOption } from '@api/choose/client';

interface State {
  content: StoryPage['content'];
  options: StoryPage['options'];
}

export function useReadPage({ story, page }: Props) {
  const [state, setState] = useState<State>({
    content: page.content,
    options: page.options,
  });

  async function selectOption(pageId: StoryPage['pageId']) {
    const page = await callChooseStoryOption(story.storyId, pageId);

    setState((state) => ({
      ...state,
      content: page.content,
      options: page.options,
    }));
  }

  return {
    selectOption,
    content: state.content,
    options: state.options,
  };
}
