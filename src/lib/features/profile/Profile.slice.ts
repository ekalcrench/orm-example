import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ProfileSlice {
  email: string;
  id: string;
  name: string;
  profilePicture: string;
}

// Define the initial state using that type
const initialState: Partial<ProfileSlice> = {};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (_, action: PayloadAction<Partial<ProfileSlice>>) => {
      return action.payload;
    },
  },
});

// actions
export const { setProfile } = profileSlice.actions;

// reducer
export default profileSlice.reducer;
