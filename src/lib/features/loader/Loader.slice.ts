import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LoaderSlice {
  loading: boolean;
}

// Define the initial state using that type
const initialState: LoaderSlice = {
  loading: false,
};

export const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, loading: action.payload };
    },
  },
});

// actions
export const { setLoading } = loaderSlice.actions;

// reducer
export default loaderSlice.reducer;
