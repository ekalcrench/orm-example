import { environtment } from '../Environments';

const userController = environtment.userController;

export const userApi = {
  register: `${userController}/register`,
  profile: `${userController}/profile`,
};
