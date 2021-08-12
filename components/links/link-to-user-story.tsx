import { Story } from '@model/story/interface';
import { FC } from 'react';
import Link from 'next/link';

export type Props = {
  className?: string;
} & (
  | {
      storyId: Story['storyId'];
    }
  | { create: true }
);

export const LinkToUserStory: FC<Props> = ({
  className,
  children,
  ...props // tslint:disable-line: trailing-comma
}) => {
  const url =
    'create' in props ? '/user/story/new' : `/user/story/${props.storyId}`;

  return (
    <Link href={url}>
      <a className={className}>{children}</a>
    </Link>
  );
};
