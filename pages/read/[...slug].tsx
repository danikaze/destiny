import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage, GetServerSideProps } from '@_app';
import { ReadPage, Props } from '@page-components/read';
import { mockStories, mockStoryPages } from '@model/story/mock';
import { pick } from '@utils/pick';

type Query = { slug: string[] };

const ReadPageHandler: AppPage<Props> = ({ story, page }: Props) => {
  return <ReadPage story={story} page={page} />;
};

export default ReadPageHandler;

export const getServerSideProps: GetServerSideProps<Props, Query> = async ({
  locale,
  params,
}) => {
  const { storyId, pageId } = getRequestData(params!.slug);

  const rawStory = mockStories.find((story) => story.storyId === storyId)!;
  const story = pick(rawStory, ['storyId', 'title']);

  const rawPage =
    story &&
    mockStoryPages.find(
      (page) => page.pageId === (pageId || rawStory.entryPageId)
    )!;
  const page = pick(rawPage, ['name', 'content', 'options']);

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      story,
      page,
    },
  };
};

function getRequestData(slug: string[]) {
  const storyId = slug[0];
  const pageId = slug[1] === 'from' ? slug[2] : undefined;

  return { storyId, pageId };
}
