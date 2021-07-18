import Link from 'next/link';
import { FC } from 'react';

export interface Props {
  className?: string;
}

export const LinkToStories: FC<Props> = ({ className, children }) => {
  return (
    <Link href="/stories">
      <a className={className}>{children || 'Stories'}</a>
    </Link>
  );
};
