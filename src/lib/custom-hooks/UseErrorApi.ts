import { useRouter } from 'next/navigation';

import { paths, unauthorized, defaultMessage } from '@/constants';
import { removeAuth } from '@/utils';
import { setCloseToast, handleOpenToast } from '../features/toast/Toast.slice';
import { useAppDispatch } from '../Hooks';

export default function useErrorApi() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const onErrorApi = async (error: any) => {
    const data = error.data;

    let message;

    if (error?.status === 401) {
      await removeAuth();

      router.replace(paths.login);
      message = unauthorized;
    }

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

  return { onErrorApi };
}
