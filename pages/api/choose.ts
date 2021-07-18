// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { restApiHandler } from '@api';
import { chooseStoryOption } from '@api/choose';

export default restApiHandler({ GET: chooseStoryOption });
