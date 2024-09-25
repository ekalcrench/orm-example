export interface QuickAmountForm {
  total: number | null;
}

export interface PageConfigProfile {
  message: string;
  quickAmount: number[];
}

export interface PageConfigProfileForm {
  message: string;
  quickAmount: QuickAmountForm[];
}

export interface SocialProfile {
  facebook: string;
  instagram: string;
  tiktok: string;
  twitch: string;
  twitter: string;
  youtube: string;
}

export interface Profile {
  pageConfig: PageConfigProfile;
  profilePictureUrl: string;
  social: SocialProfile;
}

export interface ProfileForm extends Omit<Profile, 'pageConfig'> {
  email: string;
  username: string;
  withdrawAccountExist: boolean;
  blocked: boolean;
  pageConfig: PageConfigProfileForm;
}

export interface ProfileUsernameForm {
  username: string;
}
