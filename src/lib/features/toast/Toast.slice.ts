import { CustomSnackbarProps } from '@/components/custom-snackbar/CustomSnackbar.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state using that type
const initialState: CustomSnackbarProps = {
  message: '',
  title: '',
  type: 'success',
};

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    handleOpenToast: (_, action: PayloadAction<CustomSnackbarProps>) => {
      return { ...action.payload, open: true };
    },
    setCloseToast: (state, _: PayloadAction<undefined>) => {
      return { ...state, open: false };
    },
  },
});

// actions
export const { handleOpenToast, setCloseToast } = toastSlice.actions;

// reducer
export default toastSlice.reducer;
