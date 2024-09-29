import { environtment } from '../Environments';

const postController = environtment.postController;

export const postApi = {
  getAll: `${postController}`,
  findPostById: (id: string) => `${postController}/${id}`,
  create: `${postController}/create`,
};
