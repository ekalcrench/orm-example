import * as yup from 'yup';

import { requiredEmailSchema, requiredPasswordSchema } from '@/utils';
import { Login } from './Form.types';

export const loginDefaultValue: Login = {
  email: '',
  password: '',
};

export const loginSchema = yup
  .object()
  .shape<Partial<Record<keyof Login, yup.Schema>>>({
    email: requiredEmailSchema('Email'),
    password: requiredPasswordSchema('Password'),
  })
  .required() as yup.ObjectSchema<Login>;
