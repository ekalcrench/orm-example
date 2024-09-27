import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthSlice {
  email: string;
  sessionId: string;
}

// Define the initial state using that type
const initialState: Partial<AuthSlice> = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (_, action: PayloadAction<Partial<AuthSlice>>) => {
      return action.payload;
    },
  },
});

// actions
export const { setAuth } = authSlice.actions;

// reducer
export default authSlice.reducer;
