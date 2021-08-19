import { AppPage } from '@_app';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { UserPage, Props } from '@page-components/user';
import { userRequiredServerSideProps } from '@utils/auth';
import { pick } from '@utils/pick';
import { mockStories } from '@model/story/mock';

const UserPageHandler: AppPage<Props> = (props) => {
  return <UserPage {...props} />;
};

export const getServerSideProps = userRequiredServerSideProps<Props>(
  async ({ locale, req }) => {
    const user = req.user;
    const stories = mockStories
      .filter((story) => story.authorUserId === user.userId)
      .map((story) => pick(story, ['storyId', 'title', 'state']));

    return {
      props: {
        ...(await serverSideTranslations(locale!, [
          'common',
          'user',
          'user-stories',
        ])),
        stories,
      },
    };
  }
);

export default UserPageHandler;
