import { z } from 'zod';

export const Route = {
  name: 'Multimedia',
  params: z.object({
    multimediaName: z.string(),
  }),
};
