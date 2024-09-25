import { UseFormReturn } from 'react-hook-form';

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

/**
 * Type of Profile from POST
 */
export interface Profile {
  pageConfig: PageConfigProfile;
  profilePictureUrl: string;
  social: SocialProfile;
}

/**
 * Type of Profile from GET
 * Just for FE
 */
export interface ProfileForm extends Omit<Profile, 'pageConfig'> {
  email: string;
  username: string;
  withdrawAccountExist: boolean;
  blocked: boolean;
  pageConfig: PageConfigProfileForm;
}

export interface ProfilePassword {
  newPassword: string;
  oldPassword: string;
}

export interface ProfilePasswordForm extends ProfilePassword {
  confirmationPassword: string;
}

export interface ProfileUsernameForm {
  username: string;
}

export interface ProfileFormProps {
  inputFormMethod: UseFormReturn<ProfileForm, any, undefined>;
  passwordFormMethod: UseFormReturn<ProfilePasswordForm, any, undefined>;
  usernameFormMethod: UseFormReturn<ProfileUsernameForm, any, undefined>;
  onUpdateProfile(): Promise<void>;
  onUpdatePassword(): Promise<void>;
  onUpdateUsername(): Promise<void>;
}
