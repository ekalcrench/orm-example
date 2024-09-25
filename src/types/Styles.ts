import { TextFieldProps } from '@mui/material/TextField';

export type CustomTextFieldProps = TextFieldProps & {
  isNotEmpty?: boolean;
};
