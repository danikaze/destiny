import Link from 'next/link';
import { FC } from 'react';
import { Story } from '@model/story/interface';

export interface Props {
  storyId: Story['storyId'];
  fromPageId?: Story['lastPageId'];
  className?: string;
  title?: string;
}

export const LinkToRead: FC<Props> = ({
  storyId,
  fromPageId,
  className,
  title,
  children,
}) => {
  const url = fromPageId
    ? `/read/${storyId}/from/${fromPageId}`
    : `/read/${storyId}`;

  return (
    <Link href={url}>
      <a className={className} title={title}>
        {children}
      </a>
    </Link>
  );
};
