const basePath = '/';

export const paths = {
  base: basePath,

  // Auth
  login: `${basePath}`,
  register: `${basePath}register`,
  registerSuccess: `${basePath}register/success`,

  // Dashboard
  dashboard: `${basePath}dashboard`,

  // Post
  post: `${basePath}post`,
  postDetail: (id: string) => `${basePath}post/${id}`,
};
