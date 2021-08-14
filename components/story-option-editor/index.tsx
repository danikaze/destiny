import { FC } from 'react';
import { useTranslation } from 'next-i18next';

import { StoryOption, StoryPage } from '@model/story/interface';
import { Modal } from '@components/modal';
import { Button } from '@components/button';

import { useStoryOptionEditor } from './hooks';
import styles from './story-option-editor.module.scss';

export interface Props {
  currentPageId: StoryPage['pageId'];
  option: StoryOption;
  pages: Pick<StoryPage, 'pageId' | 'name'>[];
  onCancel: () => void;
  onSave: (option: StoryOption) => void;
  className?: string;
}

export const StoryOptionEditor: FC<Props> = ({ className, ...props }) => {
  const {
    ref,
    pages,
    option,
    currentPageId,
    save,
    close,
  } = useStoryOptionEditor(props);
  const { t } = useTranslation('user-stories');

  const pageOptions = pages.map((opt) => (
    <option key={opt.pageId} value={opt.pageId}>
      {opt.name + (opt.pageId === currentPageId ? ` (current)` : '')}
    </option>
  ));

  return (
    <Modal onClose={close} header="Option Editor">
      <div className={styles.root}>
        <div>
          Name
          <input ref={ref.text} defaultValue={option.text} />
        </div>
        <div>
          Target Page{' '}
          <select ref={ref.page} defaultValue={option.pageId}>
            {pageOptions}
          </select>
        </div>
        <div>
          <Button onClick={close}>Cancel</Button>
          <Button onClick={save} type="primary">
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
};
