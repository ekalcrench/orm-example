import * as yup from 'yup';

import {
  requiredNumberSchema,
  requiredPasswordSchema,
  requiredStringSchema,
} from '@/utils';
import {
  PageConfigProfileForm,
  ProfileForm,
  ProfilePasswordForm,
  ProfileUsernameForm,
  QuickAmountForm,
} from './Form.types';

export const profileDefaultValue: ProfileForm = {
  email: '',
  pageConfig: {
    message: '',
    quickAmount: [{ total: null }],
  },
  profilePictureUrl: '',
  social: {
    facebook: '',
    instagram: '',
    twitch: '',
    twitter: '',
    youtube: '',
    tiktok: '',
  },
  username: '',
  withdrawAccountExist: false,
  blocked: false,
};

export const passwordDefaultValue: ProfilePasswordForm = {
  newPassword: '',
  oldPassword: '',
  confirmationPassword: '',
};

export const usernameDefaultValue: ProfileUsernameForm = {
  username: '',
};

export const profileSchema = yup
  .object()
  .shape<Partial<Record<keyof ProfileForm, yup.Schema>>>({
    pageConfig: yup
      .object()
      .shape<Partial<Record<keyof PageConfigProfileForm, yup.Schema>>>({
        message: requiredStringSchema('Pesan'),
        quickAmount: yup
          .array(
            yup
              .object()
              .shape<Partial<Record<keyof QuickAmountForm, yup.Schema>>>({
                total: requiredNumberSchema('Quick amount', { min: 1000 }),
              })
          )
          .min(1, 'Quick amount minimum 1'),
      }),
  })
  .required() as yup.ObjectSchema<ProfileForm>;

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

export const usernameSchema = yup
  .object()
  .shape<Partial<Record<keyof ProfileUsernameForm, yup.Schema>>>({
    username: requiredStringSchema('Username')
      .min(4, 'Min. 4 characters')
      .max(30, 'Max. 30 characters'),
  })
  .required() as yup.ObjectSchema<ProfileUsernameForm>;
