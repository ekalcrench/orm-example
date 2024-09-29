'use client';

import { ReactNode } from 'react';

import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import CustomSnackbar from '../custom-snackbar';
import LoadingModal from '../loading-modal';

function AppWrapper({ children }: { children: ReactNode }) {
  const customSnackbarState = useAppSelector((state) => state.toast);
  const loading = useAppSelector((state) => state.loader.loading);

  return (
    <main>
      <CustomSnackbar {...customSnackbarState} />
      <LoadingModal open={loading} />

      {children}
    </main>
  );
}

export default AppWrapper;
