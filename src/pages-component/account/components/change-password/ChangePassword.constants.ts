import * as yup from 'yup';

import { requiredPasswordSchema } from '@/utils';
import { ProfilePasswordForm } from './ChangePassword.types';

export const passwordDefaultValue: ProfilePasswordForm = {
  newPassword: '',
  oldPassword: '',
  confirmationPassword: '',
};

export const passwordSchema = yup
  .object()
  .shape<Partial<Record<keyof ProfilePasswordForm, yup.Schema>>>({
    oldPassword: requiredPasswordSchema('Password lama'),
    newPassword: requiredPasswordSchema('Password baru'),
    confirmationPassword: yup
      .string()
      .test('isPasswordValid', 'Password salah', function (item) {
        const parent = this.parent;
        const path = this.path;
        const newPassword = parent.newPassword;

        if (item?.length === 0) {
          return this.createError({
            path,
            message: 'Password required',
          });
        }

        if (newPassword !== item) {
          return false;
        }

        return true;
      }),
  })
  .required() as yup.ObjectSchema<ProfilePasswordForm>;
