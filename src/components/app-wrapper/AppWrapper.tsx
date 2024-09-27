'use client';

import { ReactNode, useLayoutEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import CustomSnackbar from '../custom-snackbar';
import LoadingModal from '../loading-modal';
import { getSession } from '@/actions';
import { setAuth } from '@/lib/features/auth/Auth.slice';

function AppWrapper({ children }: { children: ReactNode }) {
  const dispatch = useAppDispatch();

  const customSnackbarState = useAppSelector((state) => state.toast);
  const loading = useAppSelector((state) => state.loader.loading);

  const initAuth = async () => {
    const session = await getSession();

    dispatch(setAuth(session));
  };

  useLayoutEffect(() => {
    initAuth();
  }, []);

  return (
    <main>
      <CustomSnackbar {...customSnackbarState} />
      <LoadingModal open={loading} />

      {children}
    </main>
  );
}

export default AppWrapper;
