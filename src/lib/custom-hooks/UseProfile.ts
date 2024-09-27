'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { defaultMessage, paths, unauthorized, userApi } from '@/constants';
import { removeAuth } from '@/utils';
import { ProfileSlice, setProfile } from '../features/profile/Profile.slice';
import { setCloseToast, handleOpenToast } from '../features/toast/Toast.slice';
import { useAppSelector, useAppDispatch } from '../Hooks';
import { getSession } from '@/actions';

interface UseProfileProps {
  isNeedToBeLogout?: boolean;
}

export default function useProfile() {
  const profile = useAppSelector((state) => state.profile);
  const auth = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [needToRefetchProfile, setNeedToRefetchProfile] =
    useState<boolean>(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState<boolean>(false);

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const onErrorApi = async (message: string, status: number) => {
    if (status === 401) {
      await removeAuth();

      router.replace(paths.login);
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

  const fetchProfile = async () => {
    setIsLoadingGetData(true);

    console.log('auth di fetchProfile : ', auth);

    const res = await fetch(userApi.profile, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth?.sessionId}`,
      },
    });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data); // e.g., { message: "Login successful", token: "abc123" }
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
    }

    setIsLoadingGetData(false);
  };

  useLayoutEffect(() => {
    if (Object.keys(profile).length > 0) return;

    fetchProfile();
  }, []);

  useEffect(() => {
    if (needToRefetchProfile) fetchProfile();
  }, [needToRefetchProfile]);

  useEffect(() => {
    console.log('profile : ', profile);
  }, [JSON.stringify(profile)]);

  return {
    isLoadingGetData,
    profile,
    setNeedToRefetchProfile,
  };
}
