import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AppPage, GetServerSideProps } from '@_app';
import { ReadPage, Props } from '@page-components/read';
import { pick } from '@utils/pick';
import { readStoryToRead } from '@model/story';

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
  const { story, page } = (await readStoryToRead(storyId, pageId))!;

  const pickedStory = pick(story, ['storyId', 'title']);
  const pickedPage = pick(page, ['name', 'content', 'options']);

  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
      story: pickedStory,
      page: pickedPage,
    },
  };
};

function getRequestData(slug: string[]) {
  const storyId = slug[0];
  const pageId = slug[1] === 'from' ? slug[2] : undefined;

  return { storyId, pageId };
}
