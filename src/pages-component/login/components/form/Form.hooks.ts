import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { login } from '@/actions';
import { usePostUserAuthLoginMutation } from '@/api/user-auth';
import { defaultMessage, paths, unauthorized } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch } from '@/lib/Hooks';
import { removeAuth } from '@/utils';
import { loginDefaultValue, loginSchema } from './Form.constants';
import { Login } from './Form.types';

function useCustomForm() {
  const inputFormMethod = useForm<Login>({
    mode: 'onChange',
    defaultValues: loginDefaultValue,
    resolver: yupResolver(loginSchema),
  });

  const { getValues, trigger } = inputFormMethod;

  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get('redirect_to');

  // Api state
  const [postUserAuthLogin] = usePostUserAuthLoginMutation();

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    onSubmit();
  };

  const onSubmit = async () => {
    const values = getValues();

    try {
      dispatch(setLoading(true));

      const res = await postUserAuthLogin(values).unwrap();

      await login(res);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Anda telah sukses login, mohon ditunggu...',
          title: 'Sukses login',
          type: 'success',
          onClose: handleCloseToast,
        })
      );

      if (redirectTo) {
        router.replace(redirectTo);
      } else {
        router.replace(paths.dashboard);
      }
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    // State
    inputFormMethod,
    showPassword,

    // Function
    handleSubmit,
    setShowPassword,
  };
}

export default useCustomForm;
