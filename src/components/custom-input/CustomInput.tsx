'use client';

import { FocusEvent, useCallback } from 'react';

import { FieldValues, useController } from 'react-hook-form';

import {
  BoxFieldWrapper,
  CustomErrorMessage,
  CustomLabel,
  CustomTextField,
} from '@/styles';
import { CustomInputProps } from './CustomInput.types';

export default function CustomInput<T extends FieldValues>({
  // Required Props
  placeholder,

  // Optional Props
  boxFieldWrapperProps,
  disabled,
  label,
  maxChar,
  numeric,
  overrideOnBlur,
  overrideOnChange,
  renderErrorMessage,
  required,
  textFieldProps,
  trigger,

  // Controller Props
  name,
  ...rest
}: CustomInputProps<T>) {
  const { field, fieldState } = useController({ name, ...rest });

  const isError = !!fieldState.error;
  const isEmpty =
    field.value === null ||
    field.value === undefined ||
    field.value?.length === 0;

  const onBlur = useCallback(
    (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
      if (typeof textFieldProps?.onBlur === 'function') {
        textFieldProps.onBlur(e);

        if (overrideOnBlur) return;
      }

      // trigger yup schema validation
      if (typeof trigger === 'function') {
        trigger(name);
      }
    },
    [trigger, name, overrideOnBlur, textFieldProps]
  );

  return (
    <BoxFieldWrapper
      {...boxFieldWrapperProps}
      renderErrorMessage={renderErrorMessage}>
      {label &&
        (typeof label === 'string' ? (
          <CustomLabel>{label}</CustomLabel>
        ) : (
          label
        ))}

      <CustomTextField
        id={name}
        placeholder={placeholder}
        error={isError}
        isNotEmpty={!isEmpty}
        {...field}
        {...textFieldProps}
        onChange={(e) => {
          if (maxChar != null && e.target.value.length > maxChar) {
            e.preventDefault();
            return;
          }

          textFieldProps?.onChange?.(e);
          if (overrideOnChange) return;

          field.onChange(e);
        }}
        onKeyDown={(e) => {
          const regex = new RegExp(
            /[0-9]|(Backspace|Tab|Enter|Delete|ArrowLeft|ArrowRight|ArrowUp|ArrowDown)/
          );
          const inputNonNumeric = !e.key.match(regex);
          if (numeric && inputNonNumeric) e.preventDefault();

          textFieldProps?.onKeyDown?.(e);
        }}
        variant="outlined"
        onBlur={onBlur}
        disabled={disabled}
        required={required}
        hiddenLabel
      />

      {renderErrorMessage && isError && (
        <CustomErrorMessage color="error">
          {fieldState.error?.message}
        </CustomErrorMessage>
      )}
    </BoxFieldWrapper>
  );
}
