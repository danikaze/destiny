import { useState } from 'react';
import { Story, StoryPage } from '@model/story/interface';
import { Props } from '.';
import { callChooseStoryOption } from '@api/choose/client';
import { useUserData } from '@utils/auth';
import { ClientStorage } from '@utils/storage';

interface State {
  subtitle: StoryPage['name'];
  content: StoryPage['content'];
  options: StoryPage['options'];
}

export function useReadPage({ story, page }: Props) {
  const user = useUserData();
  const [state, setState] = useState<State>({
    subtitle: page.name,
    content: page.content,
    options: page.options,
  });

  async function selectOption(pageId: StoryPage['pageId']) {
    const page = await callChooseStoryOption(story.storyId, pageId);
    !user && updateClientPageMarker(story.storyId, pageId);

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

function updateClientPageMarker(
  storyId: Story['storyId'],
  pageId: StoryPage['pageId']
): void {
  const storage = new ClientStorage(localStorage, 'pagemarker');
  const pagemarker = storage.get('lastPages') || {};
  pagemarker[storyId] = pageId;
  storage.set('lastPages', pagemarker);
}
