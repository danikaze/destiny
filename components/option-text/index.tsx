import clsx from 'clsx';
import { FC } from 'react';
import { StoryOption } from '@model/story/interface';
import styles from './option-text.module.scss';

export type Props = Pick<StoryOption, 'pageId' | 'text'> & {
  className?: string;
  onClick?: (pageId: Props['pageId']) => void;
};

export const TextOption: FC<Props> = ({ pageId, text, className, onClick }) => {
  const clickHandler = onClick ? () => onClick(pageId) : undefined;

  return (
    <div className={clsx(styles.root, className)} onClick={clickHandler}>
      {text}
    </div>
  );
};
