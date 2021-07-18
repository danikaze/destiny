import Link from 'next/link';
import { FC } from 'react';
import { Story } from '@model/story/interface';

export interface Props {
  storyId: Story['storyId'];
  className?: string;
}

export const LinkToRead: FC<Props> = ({ storyId, className, children }) => {
  return (
    <Link href={`/read/${storyId}`}>
      <a className={className}>{children}</a>
    </Link>
  );
};
