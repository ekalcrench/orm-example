import * as yup from 'yup';

import { requiredStringSchema } from '@/utils';
import { PostForm } from './PostForm.types';

export const postDefaultValue: PostForm = {
  body: '',
  image: '',
};

export const postSchema = yup
  .object()
  .shape<Partial<Record<keyof PostForm, yup.Schema>>>({
    body: requiredStringSchema('Message').max(300, 'Maximum 300 huruf'),
  })
  .required() as yup.ObjectSchema<PostForm>;
