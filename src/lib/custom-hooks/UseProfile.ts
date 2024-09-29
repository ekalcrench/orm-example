'use client';

import { useEffect, useLayoutEffect, useState } from 'react';

import { usePathname, useRouter } from 'next/navigation';

import { defaultMessage, paths, unauthorized, userApi } from '@/constants';
import { fetchWithAuth, removeAuth } from '@/utils';
import { ProfileSlice, setProfile } from '../features/profile/Profile.slice';
import { setCloseToast, handleOpenToast } from '../features/toast/Toast.slice';
import { useAppSelector, useAppDispatch } from '../Hooks';
import useErrorApi from './UseErrorApi';

export default function useProfile() {
  const profile = useAppSelector((state) => state.profile);
  const { onErrorApi } = useErrorApi();

  const dispatch = useAppDispatch();

  const [needToRefetchProfile, setNeedToRefetchProfile] =
    useState<boolean>(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState<boolean>(false);

  const fetchProfile = async () => {
    setIsLoadingGetData(true);

    const res = await fetchWithAuth(userApi.profile, { method: 'GET' });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data); // e.g., { message: "Login successful", token: "abc123" }
      dispatch(setProfile(data));
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
