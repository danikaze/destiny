import { createRef } from 'react';
import { Props } from '.';

export function useStoryOptionEditor(props: Props) {
  const ref = {
    text: createRef<HTMLInputElement>(),
    page: createRef<HTMLSelectElement>(),
  };

  function save() {
    props.onSave({
      ...props.option,
      text: ref.text.current!.value,
      pageId: ref.page.current!.value,
    });
  }

  function close() {
    props.onCancel();
  }

  return {
    ref,
    save,
    close,
    currentPageId: props.currentPageId,
    pages: props.pages,
    option: props.option,
  };
}
