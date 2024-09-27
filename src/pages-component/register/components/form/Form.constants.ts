import * as yup from 'yup';

import {
  requiredBooleanSchema,
  requiredEmailSchema,
  requiredPasswordSchema,
  requiredStringSchema,
} from '@/utils';
import { RegisterForm } from './Form.types';

export const registerDefaultValue: RegisterForm = {
  isMoreThan17: false,
  email: '',
  name: '',
  password: '',
  confirmationPassword: '',
};

export const registerSchema = yup
  .object()
  .shape<Partial<Record<keyof RegisterForm, yup.Schema>>>({
    isMoreThan17: requiredBooleanSchema(''),
    email: requiredEmailSchema('Email'),
    name: requiredStringSchema('Name'),
    password: requiredPasswordSchema('Password'),
    confirmationPassword: yup
      .string()
      .test('isPasswordValid', 'Password salah', function (item) {
        const parent = this.parent;
        const path = this.path;
        const password = parent.password;

        if (item?.length === 0) {
          return this.createError({
            path,
            message: 'Password required',
          });
        }

        if (password !== item) {
          return false;
        }

        return true;
      }),
  })
  .required() as yup.ObjectSchema<RegisterForm>;
