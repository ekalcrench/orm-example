'use client';

import { createContext, useContext, Context, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import {
  usePostUpdatePasswordUserProfileMutation,
  usePostUpdateUsernameUserProfileMutation,
  usePostUpdateUserProfileMutation,
} from '@/api/user-profile';
import { defaultMessage, paths, unauthorized } from '@/constants';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  setCloseToast,
  handleOpenToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import { removeAuth } from '@/utils';
import {
  passwordDefaultValue,
  passwordSchema,
  profileDefaultValue,
  profileSchema,
  usernameDefaultValue,
  usernameSchema,
} from './Form.constants';
import {
  Profile,
  ProfileForm,
  ProfileFormProps,
  ProfilePassword,
  ProfilePasswordForm,
  ProfileUsernameForm,
} from './Form.types';
import {
  setProfile,
  setProfilePictureUrl,
  setProfileUsername,
} from '@/lib/features/profile/Profile.slice';
import { useMediaQuery } from 'react-responsive';

export default function useProfileForm() {
  const { isLoading } = useProfile({ isNeedToBeLogout: true });

  const inputFormMethod = useForm<ProfileForm>({
    mode: 'onChange',
    defaultValues: profileDefaultValue,
    resolver: yupResolver(profileSchema),
  });

  const passwordFormMethod = useForm<ProfilePasswordForm>({
    mode: 'onChange',
    defaultValues: passwordDefaultValue,
    resolver: yupResolver(passwordSchema),
  });

  const usernameFormMethod = useForm<ProfileUsernameForm>({
    mode: 'onChange',
    defaultValues: usernameDefaultValue,
    resolver: yupResolver(usernameSchema),
  });

  const [updateProfile] = usePostUpdateUserProfileMutation();
  const [updatePassword] = usePostUpdatePasswordUserProfileMutation();
  const [updateUsername] = usePostUpdateUsernameUserProfileMutation();

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  const router = useRouter();

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const init = () => {
    inputFormMethod.reset({
      ...inputFormMethod.getValues(),
      ...profile,
      pageConfig: {
        ...profile.pageConfig,
        quickAmount: profile.pageConfig?.quickAmount
          ? profile.pageConfig.quickAmount.map((value) => {
              return { total: value };
            })
          : [{ total: null }],
      },
    });
    usernameFormMethod.reset({ username: profile.username ?? '' });
  };

  const onErrorApi = async (error: any) => {
    let message;

    if (error?.status === 401) {
      await removeAuth();

      router.replace(paths.login);
      message = unauthorized;
    }

    const data = error.data;

    if (data?.errors?.messages) {
      message = data?.errors?.messages[0];
    }

    dispatch(
      handleOpenToast({
        open: true,
        message: message ?? defaultMessage,
        type: 'error',
        onClose: handleCloseToast,
      })
    );
  };

  const onUpdateProfile = async () => {
    const values = inputFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      const payload: Profile = {
        pageConfig: {
          ...values.pageConfig,
          quickAmount: values.pageConfig.quickAmount.map(
            (value) => value.total ?? 0
          ),
        },
        profilePictureUrl: values.profilePictureUrl,
        social: values.social,
      };

      await updateProfile(payload).unwrap();

      dispatch(setProfilePictureUrl(payload.profilePictureUrl));

      inputFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update profile',
          title: 'Sukses',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onUpdatePassword = async () => {
    const values = passwordFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      const payload: ProfilePassword = {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      };

      await updatePassword(payload).unwrap();

      passwordFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update password',
          title: 'Sukses',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onUpdateUsername = async () => {
    const values = usernameFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      await updateUsername(values).unwrap();

      dispatch(setProfileUsername(values.username));

      usernameFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update username',
          title: 'Sukses',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (Object.keys(profile).length === 0) return;

    init();
  }, [JSON.stringify(profile)]);

  return {
    // State
    inputFormMethod,
    isLoading,
    passwordFormMethod,
    usernameFormMethod,

    // Function
    onUpdatePassword,
    onUpdateProfile,
    onUpdateUsername,
  };
}

export const ProfileFormContext = createContext<ProfileFormProps | null>(null);

export const useProfileFormContext = () => {
  const context = useContext<ProfileFormProps>(
    ProfileFormContext as unknown as Context<ProfileFormProps>
  );

  if (!context) {
    throw new Error('CustomFormContext must be used within a StoreProvider.');
  }

  return context;
};
