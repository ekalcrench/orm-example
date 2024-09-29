const apimPath = process.env.NEXT_PUBLIC_API_URL ?? '';

export const environtment = {
  authController: `${apimPath}/auth`,
  postController: `${apimPath}/posts`,
  userController: `${apimPath}/users`,
};
