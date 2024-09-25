import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface QmePageConfig {
  active: boolean;
  question: string;
  tipsActive: boolean;
  tipsQuickAmounts: number[];
  voiceMessageActive: boolean;
}

export interface PageConfigProfile {
  message: string;
  quickAmount: number[];
}

export interface SocialProfile {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitch: string;
  twitter: string;
  youtube: string;
}

export interface ProfileSlice {
  email: string;
  id: string;
  qmePageConfig: Partial<QmePageConfig>;
  pageConfig: Partial<PageConfigProfile>;
  profilePictureUrl: string;
  social: Partial<SocialProfile>;
  username: string;
  withdrawAccountExist: boolean;
  blocked: boolean;
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
    setProfileUsername: (state, action: PayloadAction<string>) => {
      return { ...state, username: action.payload };
    },
    setProfilePictureUrl: (state, action: PayloadAction<string>) => {
      return { ...state, profilePictureUrl: action.payload };
    },
    removeProfile: (_, _action: PayloadAction<void>) => {
      return {};
    },
  },
});

// actions
export const {
  setProfile,
  setProfileUsername,
  setProfilePictureUrl,
  removeProfile,
} = profileSlice.actions;

// reducer
export default profileSlice.reducer;
