import { Story } from '@model/story/interface';
import { ClientStorage } from '@utils/storage';
import { useEffect, useState } from 'react';
import { Props } from '.';

interface State {
  stories: Story[];
}

export function useStoriesPage({ stories }: Props) {
  const [state, setState] = useState<State>({
    stories,
  });

  useEffect(() => {
    setState({ stories: addClientPageMarkers(stories) });
  }, [stories]);

  function removeClientPageMarker(storyId: Story['storyId']) {
    // handle local storage
    const storage = new ClientStorage(localStorage, 'pagemarker');
    const pagemarkers = storage.get('lastPages') || {};
    if (pagemarkers[storyId]) {
      delete pagemarkers[storyId];
      storage.set('lastPages', pagemarkers);
    }

    // handle state
    const i = state.stories.findIndex((story) => story.storyId === storyId);
    if (i === -1) return;
    setState((state) => {
      const updatedStory = { ...state.stories[i] };
      delete updatedStory.lastPageId;
      const stories = [...state.stories];
      stories.splice(i, 1, updatedStory);

      return { stories };
    });
  }

  return {
    removeClientPageMarker,
    stories: state.stories,
  };
}

function addClientPageMarkers(stories: Story[]) {
  const storage = new ClientStorage(localStorage, 'pagemarker');
  const pagemarkers = storage.get('lastPages') || {};

  return stories.map((story) => {
    return {
      ...story,
      lastPageId: story.lastPageId || pagemarkers[story.storyId],
    };
  }, []);
}
