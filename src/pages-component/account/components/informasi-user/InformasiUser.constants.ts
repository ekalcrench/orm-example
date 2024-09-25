import * as yup from 'yup';

import { requiredNumberSchema, requiredStringSchema } from '@/utils';
import {
  PageConfigProfileForm,
  ProfileForm,
  ProfileUsernameForm,
  QuickAmountForm,
} from './InformasiUser.types';

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

export const usernameSchema = yup
  .object()
  .shape<Partial<Record<keyof ProfileUsernameForm, yup.Schema>>>({
    username: requiredStringSchema('Username')
      .min(4, 'Min. 4 characters')
      .max(30, 'Max. 30 characters'),
  })
  .required() as yup.ObjectSchema<ProfileUsernameForm>;
