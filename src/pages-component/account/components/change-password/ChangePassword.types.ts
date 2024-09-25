export interface ProfilePassword {
  newPassword: string;
  oldPassword: string;
}

export interface ProfilePasswordForm extends ProfilePassword {
  confirmationPassword: string;
}
