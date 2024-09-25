'use client';

import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Controller, FieldValues } from 'react-hook-form';

import checkedCheckbox from '@/static/svg/checked-checkbox.svg';
import defaultCheckbox from '@/static/svg/default-checkbox.svg';
import errorCheckbox from '@/static/svg/error-checkbox.svg';
import { BoxFieldWrapper, CustomErrorMessage, CustomLabel } from '@/styles';
import CustomImage from '../custom-image';
import { CheckboxStyle, CheckboxWrapper } from './CustomCheckbox.styles';
import { CustomCheckboxProps } from './CustomCheckbox.types';

export default function CustomCheckbox<T extends FieldValues>({
  boxFieldWrapperProps,
  checkboxHeight,
  checkboxLabel,
  checkboxProps,
  checkboxWidth,
  controllerProps,
  disabled,
  label,
  overrideOnChange,
  renderErrorMessage,
}: CustomCheckboxProps<T>) {
  const isCheckboxLabelString = typeof checkboxLabel === 'string';
  const isCheckboxLabelReactNode = typeof checkboxLabel === 'object';

  if (!controllerProps) {
    return (
      <BoxFieldWrapper {...boxFieldWrapperProps}>
        {label && <CustomLabel>{label}</CustomLabel>}

        <CheckboxWrapper>
          <CheckboxStyle
            {...checkboxProps}
            disabled={disabled}
            icon={
              <CustomImage
                src={defaultCheckbox.src}
                alt="default checkbox"
                width={checkboxWidth ?? 24}
                height={checkboxHeight ?? 24}
              />
            }
            checkedIcon={
              <CustomImage
                src={checkedCheckbox.src}
                alt="checked checkbox"
                width={checkboxWidth ?? 24}
                height={checkboxHeight ?? 24}
              />
            }
          />

          {isCheckboxLabelString && (
            <Typography sx={{ ml: 1.5 }}>{checkboxLabel}</Typography>
          )}

          {isCheckboxLabelReactNode && (
            <Box sx={{ ml: 1.5 }}>{checkboxLabel}</Box>
          )}
        </CheckboxWrapper>
      </BoxFieldWrapper>
    );
  }

  const { name, control } = controllerProps;

  return (
    <BoxFieldWrapper
      {...boxFieldWrapperProps}
      renderErrorMessage={renderErrorMessage}>
      {label && <CustomLabel>{label}</CustomLabel>}

      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => {
          const isError = !!fieldState.error;

          return (
            <Fragment>
              <CheckboxWrapper>
                <CheckboxStyle
                  {...field}
                  {...checkboxProps}
                  onChange={(e, checked) => {
                    if (
                      overrideOnChange &&
                      typeof checkboxProps?.onChange === 'function'
                    ) {
                      checkboxProps.onChange(e, checked);

                      return;
                    }

                    field.onChange(e);
                    checkboxProps?.onChange?.(e, checked);
                  }}
                  checked={field.value}
                  disabled={disabled}
                  icon={
                    isError ? (
                      <CustomImage
                        src={errorCheckbox.src}
                        alt="error checkbox"
                        width={checkboxWidth ?? 24}
                        height={checkboxHeight ?? 24}
                      />
                    ) : (
                      <CustomImage
                        src={defaultCheckbox.src}
                        alt="default checkbox"
                        width={checkboxWidth ?? 24}
                        height={checkboxHeight ?? 24}
                      />
                    )
                  }
                  checkedIcon={
                    <CustomImage
                      src={checkedCheckbox.src}
                      alt="checkbox"
                      width={checkboxWidth ?? 24}
                      height={checkboxHeight ?? 24}
                    />
                  }
                />

                {isCheckboxLabelString && (
                  <Typography
                    sx={{ ml: 1.5, cursor: 'pointer' }}
                    onClick={() => field.onChange(!field.value)}>
                    {checkboxLabel}
                  </Typography>
                )}

                {isCheckboxLabelReactNode && (
                  <Box
                    sx={{ ml: 1.5, cursor: 'pointer' }}
                    onClick={() => field.onChange(!field.value)}>
                    {checkboxLabel}
                  </Box>
                )}
              </CheckboxWrapper>

              {renderErrorMessage && isError && (
                <CustomErrorMessage color="error">
                  {fieldState.error?.message}
                </CustomErrorMessage>
              )}
            </Fragment>
          );
        }}
      />
    </BoxFieldWrapper>
  );
}
