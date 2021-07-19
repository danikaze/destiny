import { useState } from 'react';
import { StoryPage } from '@model/story/interface';
import { Props } from '.';
import { callChooseStoryOption } from '@api/choose/client';

interface State {
  subtitle: StoryPage['name'];
  content: StoryPage['content'];
  options: StoryPage['options'];
}

export function useReadPage({ story, page }: Props) {
  const [state, setState] = useState<State>({
    subtitle: page.name,
    content: page.content,
    options: page.options,
  });

  async function selectOption(pageId: StoryPage['pageId']) {
    const page = await callChooseStoryOption(story.storyId, pageId);

    setState((state) => ({
      ...state,
      subtitle: page.name,
      content: page.content,
      options: page.options,
    }));
  }

  return {
    selectOption,
    subtitle: state.subtitle,
    content: state.content,
    options: state.options,
  };
}
