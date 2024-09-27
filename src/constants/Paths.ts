const basePath = '/';

export const paths = {
  base: basePath,

  // Auth
  login: `${basePath}`,
  register: `${basePath}register`,
  registerSuccess: `${basePath}register/success`,

  // Dashboard
  dashboard: `${basePath}dashboard`,

  // Account
  account: `${basePath}account`,
  changePassword: `${basePath}account/change-password`,
  connectedDevice: `${basePath}account/connected-device`,
  requestDeletion: `${basePath}account/request-account-deletion`,
};
