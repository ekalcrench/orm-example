import { useRouter } from 'next/navigation';

import { paths, defaultMessage } from '@/constants';
import { removeAuth } from '@/utils';
import { setCloseToast, handleOpenToast } from '../features/toast/Toast.slice';
import { useAppDispatch } from '../Hooks';

export default function useErrorApi() {
  const dispatch = useAppDispatch();
  const router = useRouter();

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

  return { onErrorApi };
}
