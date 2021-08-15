import { callDeleteStoryApi } from '@api/user-story/client';
import { Story } from '@model/story/interface';
import { useLogger } from '@utils/logger';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { Props } from '.';

interface State {
  stories: Story[];
}

export function useUserStories(props: Props) {
  const logger = useLogger('user-story');
  const { t } = useTranslation('user-stories');
  const [state, setState] = useState<State>({ stories: props.stories });

  async function deleteStory(storyId: Story['storyId']) {
    const currentStory = state.stories.find(
      (story) => story.storyId === storyId
    );
    if (!currentStory) return;

    const deleteIt = confirm(t('confirmDelete', { title: currentStory.title }));
    if (!deleteIt) return;

    try {
      await callDeleteStoryApi(storyId);
    } catch (error) {
      logger.error(error);
      return;
    }

    setState((state) => {
      const index = state.stories.findIndex(
        (story) => story.storyId === storyId
      );
      if (index === -1) return state;

      const updatedStories = [...state.stories];
      updatedStories.splice(index, 1);

      return {
        ...state,
        stories: updatedStories,
      };
    });
  }

  return {
    t,
    deleteStory,
    stories: state.stories,
  };
}
