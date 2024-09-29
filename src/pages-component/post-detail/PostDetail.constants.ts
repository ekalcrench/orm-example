import * as yup from 'yup';

import { requiredStringSchema } from '@/utils';
import { PostForm } from './PostDetail.types';

export const postDefaultValue: PostForm = {
  body: '',
  image: '',
  id: '',
};

export const postSchema = yup
  .object()
  .shape<Partial<Record<keyof PostForm, yup.Schema>>>({
    body: requiredStringSchema('Message').max(300, 'Maximum 300 huruf'),
  })
  .required() as yup.ObjectSchema<PostForm>;
