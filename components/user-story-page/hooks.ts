import { createRef, useState } from 'react';
import { useTranslation } from 'next-i18next';

import { callEditStoryPageApi } from '@api/user-story-page/client';
import { StoryOption, StoryPage } from '@model/story/interface';
import { useLogger } from '@utils/logger';

import { Props } from '.';

interface State {
  page: Props['page'] & Required<Pick<Props['page'], 'options'>>;
  activeOption: StoryOption | null;
}

export function useUserStoryPage(props: Props) {
  const logger = useLogger('user-story-page');
  const { t } = useTranslation('user-stories');
  const [state, setState] = useState<State>({
    page: {
      options: [],
      ...props.page,
    },
    activeOption: null,
  });
  const ref = {
    title: createRef<HTMLInputElement>(),
    content: createRef<HTMLTextAreaElement>(),
  };
  async function savePage() {
    try {
      const name = ref.title.current!.value;
      await callEditStoryPageApi(props.story.storyId, props.page.pageId, {
        name,
      });
    } catch (error) {
      logger.error(error);
    }
  }

  function titleChangeHandler() {
    setState((state) => ({
      ...state,
      page: {
        ...state.page,
        name: ref.title.current!.value,
      },
    }));
  }

  function contentChangeHandler() {
    setState((state) => ({
      ...state,
      page: {
        ...state.page,
        content: ref.content.current!.value,
      },
    }));
  }

  function createNewPageOption() {
    setState((state) => ({
      ...state,
      activeOption: getNewPageOption(state.page.pageId),
    }));
  }

  function editPageOption(option: StoryOption) {
    setState((state) => ({
      ...state,
      activeOption: option,
    }));
  }

  function closePageOptionEditor() {
    setState((state) => ({
      ...state,
      activeOption: null,
    }));
  }

  async function savePageOption(option: StoryOption) {
    const options = [...state.page.options];
    const optionIndex = state.page.options.findIndex(
      (opt) => opt === state.activeOption
    );
    if (optionIndex === -1) {
      options.push(option);
    } else {
      options.splice(optionIndex, 1, option);
    }

    await callEditStoryPageApi(state.page.storyId, state.page.pageId, {
      options,
    });

    setState((state) => ({
      ...state,
      page: {
        ...state.page,
        options,
      },
      activeOption: null,
    }));
  }

  async function deletePageOption(index: number) {
    const deleteIt = confirm(
      t('confirmOptionDelete', { text: state.page.options[index].text })
    );
    if (!deleteIt) return;

    const options = [...state.page.options];
    options.splice(index, 1);

    await callEditStoryPageApi(state.page.storyId, state.page.pageId, {
      options,
    });

    setState((state) => ({
      ...state,
      page: {
        ...state.page,
        options,
      },
      activeOption: null,
    }));
  }

  return {
    t,
    savePage,
    createNewPageOption,
    editPageOption,
    closePageOptionEditor,
    savePageOption,
    deletePageOption,
    titleChangeHandler,
    contentChangeHandler,
    ref,
    activeOption: state.activeOption,
    page: state.page,
    pages: props.pages,
  };
}

function getNewPageOption(pageId: StoryPage['pageId']): StoryOption {
  return {
    pageId,
    type: 'text',
    text: 'Option text',
  };
}
