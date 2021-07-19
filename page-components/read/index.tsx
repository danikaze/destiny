import { FC } from 'react';
import { Page } from '@components/page';
import { Story, StoryOption, StoryPage } from '@model/story/interface';
import { useReadPage } from './hooks';
import { TextOption } from '@components/option-text';

import styles from './read.module.scss';

export interface Props {
  story: Story;
  page: StoryPage;
}

export const ReadPage: FC<Props> = (props) => {
  const title = `${PACKAGE_NAME} - ${PACKAGE_VERSION} (${COMMIT_HASH_SHORT})`;
  const { selectOption, subtitle, content, options } = useReadPage(props);

  const optionsElem = options && (
    <ul className={styles.optionsList}>{options.map(renderOption)}</ul>
  );

  function renderOption(option: StoryOption): JSX.Element {
    return (
      <li key={option.pageId}>
        <TextOption
          onClick={selectOption}
          pageId={option.pageId}
          text={option.text}
        />
      </li>
    );
  }

  return (
    <Page
      active="story"
      title={title}
      header={subtitle}
      subHeader={props.story.title}
    >
      {content}
      {optionsElem}
    </Page>
  );
};
