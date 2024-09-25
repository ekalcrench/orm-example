import { BoxProps } from '@mui/material/Box';
import { CheckboxProps } from '@mui/material/Checkbox';
import { FieldValues, UseControllerProps } from 'react-hook-form';

export interface CustomCheckboxProps<T extends FieldValues> {
  boxFieldWrapperProps?: BoxProps;
  checkboxHeight?: number;
  checkboxLabel?: string | React.ReactNode;
  checkboxProps?: CheckboxProps;
  checkboxWidth?: number;
  controllerProps?: UseControllerProps<T>;
  disabled?: boolean;
  isGroup?: boolean;
  label?: string | React.ReactNode;
  overrideOnChange?: boolean;
  renderErrorMessage?: boolean;
}
