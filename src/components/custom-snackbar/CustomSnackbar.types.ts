import { SnackbarProps } from '@mui/material/Snackbar';

export type SnackbarType = 'success' | 'error' | 'warning';

export interface SnackbarBody {
  message: string;
  title?: string;
}

export interface CustomSnackbarProps
  extends Omit<SnackbarProps, 'message'>,
    SnackbarBody {
  type: SnackbarType;
}
