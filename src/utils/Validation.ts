import * as yup from 'yup';

export const requiredStringSchema = (fieldLabel: string) => {
  return yup.string().required(`${fieldLabel} required`);
};

export const requiredNumberSchema = (
  fieldLabel: string,
  { min, max }: { min?: number; max?: number }
) => {
  if (min && max) {
    return yup
      .number()
      .min(min, `${fieldLabel} minimum is ${min}`)
      .max(max, `${fieldLabel} maximum is ${max}`)
      .required(`${fieldLabel} required`);
  }

  if (max) {
    return yup
      .number()
      .max(max, `${fieldLabel} maximum is ${max}`)
      .required(`${fieldLabel} required`);
  }

  return yup
    .number()
    .min(min ?? 0, `${fieldLabel} minimum is ${min}`)
    .required(`${fieldLabel} required`);
};

export const requiredDropdownSchema = (fieldLabel: string) => {
  return yup.object().nullable().required(`${fieldLabel} required`);
};

export const requiredEmailSchema = (fieldLabel?: string) => {
  return yup
    .string()
    .trim()
    .email(`${fieldLabel} invalid`)
    .required(`${fieldLabel} required`);
};

export const requiredDateSchema = (fieldLabel?: string) => {
  return yup
    .date()
    .nullable()
    .test('is-present', `${fieldLabel} required`, function (value) {
      return value !== null;
    });
};

export const requiredBooleanSchema = (fieldLabel: string) => {
  return yup.boolean().oneOf([true], `${fieldLabel} must be checked`);
};

export const requiredPasswordSchema = (fieldLabel: string) => {
  return yup
    .string()
    .required(`${fieldLabel} required`)
    .matches(
      /^(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Min. 8 Karakter, 1 Huruf Besar, 1 Angka'
    );
};

export const requiredObjectSchema = (fieldLabel: string) => {
  return yup
    .object()
    .required(`${fieldLabel} required`)
    .typeError(`${fieldLabel} required`);
};
