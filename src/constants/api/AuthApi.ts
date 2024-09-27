import { environtment } from '../Environments';

const authController = environtment.authController;

export const authApi = {
  login: `${authController}/login`,
};
