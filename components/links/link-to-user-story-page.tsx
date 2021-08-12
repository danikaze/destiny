import { StoryPage } from '@model/story/interface';
import { FC } from 'react';
import Link from 'next/link';

export type Props = {
  className?: string;
} & (
  | {
      storyId: StoryPage['storyId'];
      pageId: StoryPage['pageId'];
    }
  | {
      storyId: StoryPage['storyId'];
      create: true;
    }
);

export const LinkToUserStoryPage: FC<Props> = ({
  className,
  children,
  ...props // tslint:disable-line: trailing-comma
}) => {
  const url =
    `/user/story/${props.storyId}/page/` +
    ('create' in props ? 'new' : props.pageId);

  return (
    <Link href={url}>
      <a className={className}>{children}</a>
    </Link>
  );
};
