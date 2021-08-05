import Link from 'next/link';
import { FC } from 'react';
import { Story } from '@model/story/interface';

export interface Props {
  storyId: Story['storyId'];
  fromPageId?: Story['lastPageId'];
  className?: string;
}

export const LinkToRead: FC<Props> = ({
  storyId,
  fromPageId,
  className,
  children,
}) => {
  const url = fromPageId
    ? `/read/${storyId}/from/${fromPageId}`
    : `/read/${storyId}`;

  return (
    <Link href={url}>
      <a className={className}>{children}</a>
    </Link>
  );
};
