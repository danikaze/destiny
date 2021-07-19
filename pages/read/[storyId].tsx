import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage, GetServerSideProps } from '@_app';
import { ReadPage, Props } from '@page-components/read';
import { mockStories, mockStoryPages } from '@model/story/mock';

type Query = { storyId: string };

const ReadPageHandler: AppPage<Props> = ({ story, page }: Props) => {
  return <ReadPage story={story} page={page} />;
};

export default ReadPageHandler;

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  locale,
  params,
}) => {
  const storyId = params!.storyId;
  const story = mockStories.find((story) => story.storyId === storyId)!;
  const page =
    story && mockStoryPages.find((page) => page.pageId === story.entryPageId)!;

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      story,
      page,
    },
  };
};
