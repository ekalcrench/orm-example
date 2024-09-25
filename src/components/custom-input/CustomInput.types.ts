import { BoxProps } from '@mui/material/Box';
import { TextFieldProps } from '@mui/material/TextField';
import {
  FieldValues,
  UseControllerProps,
  UseFormTrigger,
} from 'react-hook-form';

interface ExtendedTextFieldProps<T extends FieldValues> {
  // Required Props
  placeholder: string;

  // Optional Props
  boxFieldWrapperProps?: BoxProps;
  disabled?: boolean;
  label?: string | React.ReactNode;
  maxChar?: number;
  numeric?: boolean;
  overrideOnBlur?: boolean;
  overrideOnChange?: boolean;
  renderErrorMessage?: boolean;
  required?: boolean;
  textFieldProps?: Omit<TextFieldProps, 'required' | 'disabled'>;

  /**
   * please pass this trigger from `useForm`
   * if the field is a required field to auto validate using yup
   * schema. This will be used in `onBlur` method if the field is marked
   * as required. So, when user move from the required field, the error message
   * will appear to the user and you (as the dev) don't have to manually
   * apply it whenever you want to create a required input
   *
   * this trigger won't executed if you pass the `onBlur` method manually.
   */
  trigger?: UseFormTrigger<T>;
}

export type CustomInputProps<T extends FieldValues> = UseControllerProps<T> &
  ExtendedTextFieldProps<T>;
