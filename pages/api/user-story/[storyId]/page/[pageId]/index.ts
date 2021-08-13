// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { restApiHandler } from '@api';
import { deleteStoryPageApiHandler } from '@api/user-story-page/delete';
import { editStoryPageApiHandler } from '@api/user-story-page/edit';

export default restApiHandler({
  DELETE: deleteStoryPageApiHandler,
  PUT: editStoryPageApiHandler,
});
