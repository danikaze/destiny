import clsx from 'clsx';
import { FC } from 'react';

import { Story, StoryPage } from '@model/story/interface';
import { Icon } from '@components/icon';
import { StoryOptionEditor } from '@components/story-option-editor';
import { ListItem } from '@components/list-item';
import { Button } from '@components/button';

import { useUserStoryPage } from './hooks';
import styles from './user-story-page.module.scss';

type StoryProps = Pick<Story, 'storyId'>;
type StoryPageProps = Pick<
  StoryPage,
  'storyId' | 'pageId' | 'name' | 'content' | 'options'
>;
type StoryPageListItem = Pick<StoryPage, 'pageId' | 'name'>;

export interface Props {
  story: StoryProps;
  page: StoryPageProps;
  pages: StoryPageListItem[];
  className?: string;
}

export const UserStoryPage: FC<Props> = ({ className, ...props }) => {
  const {
    t,
    page,
    pages,
    ref,
    activeOption,
    savePage,
    createNewPageOption,
    editPageOption,
    closePageOptionEditor,
    savePageOption,
    deletePageOption,
    titleChangeHandler,
    contentChangeHandler,
  } = useUserStoryPage(props);

  const optionElems =
    page.options &&
    page.options.map((option, index) => {
      const editOption = () => editPageOption(option);
      const deleteOption = () => deletePageOption(index);
      const deleteAction = (
        <Icon
          type="bin"
          key="delete"
          onClick={deleteOption}
          title={t('deleteOptionButtonTitle')}
        />
      );
      const actions = [deleteAction];

      return (
        <ListItem key={index} actions={actions}>
          <div onClick={editOption}>{option.text}</div>
        </ListItem>
      );
    });

  const optionEditorElem = activeOption && (
    <StoryOptionEditor
      currentPageId={page.pageId}
      pages={pages}
      option={activeOption}
      onCancel={closePageOptionEditor}
      onSave={savePageOption}
    />
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div>
        {t('pageTitle')}:{' '}
        <input
          ref={ref.title}
          defaultValue={page.name}
          onChange={titleChangeHandler}
        />
      </div>
      <div>
        {t('pageContents')}:{' '}
        <textarea
          ref={ref.content}
          onChange={contentChangeHandler}
          defaultValue={page.content}
        />
      </div>
      <button onClick={savePage}>Save</button>
      <h3>{t('pageOptions')}</h3>
      <Button onClick={createNewPageOption}>
        <Icon type="plus" /> {t('createOptionButton')}
      </Button>
      {optionElems}
      {optionEditorElem}
    </div>
  );
};
