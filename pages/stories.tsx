import { AppPage } from '@_app';
import { Props } from '@page-components/index';
import { StoriesPage } from '@page-components/stories';
import { mockStories } from '@model/story/mock';

const StoriesPageHandler: AppPage<Props> = () => {
  return <StoriesPage stories={mockStories} />;
};

export default StoriesPageHandler;
