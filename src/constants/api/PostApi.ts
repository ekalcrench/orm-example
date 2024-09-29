import { environtment } from '../Environments';

const postController = environtment.postController;

export const postApi = {
  getAll: `${postController}`,
  create: `${postController}/create`,
};
