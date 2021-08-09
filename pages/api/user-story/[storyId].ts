// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { restApiHandler } from '@api';
import { deleteStoryApiHandler } from '@api/user-story/delete';
import { editStoryApiHandler } from '@api/user-story/edit';

export default restApiHandler({
  DELETE: deleteStoryApiHandler,
  PUT: editStoryApiHandler,
});
