'use client';

import { useEffect, useState } from 'react';

import _ from 'lodash';
import { usePathname, useRouter } from 'next/navigation';

import { useLazyGetUserProfileQuery } from '@/api/user-profile';
import { defaultMessage, paths, unauthorized } from '@/constants';
import { removeAuth } from '@/utils';
import { ProfileSlice, setProfile } from '../features/profile/Profile.slice';
import { setCloseToast, handleOpenToast } from '../features/toast/Toast.slice';
import { useAppSelector, useAppDispatch } from '../Hooks';

interface UseProfileProps {
  isNeedToBeLogout?: boolean;
}

export default function useProfile({
  isNeedToBeLogout = false,
}: UseProfileProps) {
  const [
    getUserProfile,
    { isLoading: isLoadingGetData, isFetching: isFetchingGetData },
  ] = useLazyGetUserProfileQuery();

  const isLoading = isLoadingGetData || isFetchingGetData;

  const profile = useAppSelector((state) => state.profile);

  const dispatch = useAppDispatch();

  const pathname = usePathname();
  const router = useRouter();

  const [isProfileComplete, setIsProfileComplete] = useState<boolean>(false);
  const [needToRefetchProfile, setNeedToRefetchProfile] =
    useState<boolean>(false);

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const onErrorApi = async (error: any) => {
    let message;

    if (error?.status === 401) {
      await removeAuth();

      if (isNeedToBeLogout) router.replace(paths.login);
      message = unauthorized;
    }

    const data = error.data;

    if (data?.errors?.messages) {
      message = data?.errors?.messages[0];
    }

    if (isNeedToBeLogout) {
      dispatch(
        handleOpenToast({
          open: true,
          message: message ?? defaultMessage,
          type: 'error',
          onClose: handleCloseToast,
        })
      );
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await getUserProfile().unwrap();

      setIsProfileComplete(checkIsProfileComplete(res));

      dispatch(setProfile(res));
    } catch (error) {
      onErrorApi(error);
    }
  };

  const checkIsProfileComplete = (res: Partial<ProfileSlice>): boolean => {
    const fullRes: Partial<ProfileSlice> = {
      profilePictureUrl: '',
    };

    for (const key in fullRes) {
      const currentKey = key as keyof ProfileSlice;

      if (currentKey === 'profilePictureUrl' && res[currentKey]?.length === 0) {
        return false;
      }
    }

    return true;
  };

  useEffect(() => {
    if (Object.keys(profile).length > 0) return;

    fetchProfile();
  }, []);

  useEffect(() => {
    if (Object.keys(profile).length === 0) return;

    setIsProfileComplete(checkIsProfileComplete(profile));
  }, [pathname]);

  useEffect(() => {
    if (needToRefetchProfile) fetchProfile();
  }, [needToRefetchProfile]);

  return { isLoading, isProfileComplete, profile, setNeedToRefetchProfile };
}
