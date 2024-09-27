import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { login } from '@/actions';
import { authApi, defaultMessage, paths, unauthorized } from '@/constants';
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

  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

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

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    onSubmit();
  };

  const onSubmit = async () => {
    const values = getValues();

    dispatch(setLoading(true));

    const res = await fetch(authApi.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data); // e.g., { message: "Login successful", token: "abc123" }
      await login({ email: data.email, sessionId: data.sessionId });
      dispatch(
        handleOpenToast({
          open: true,
          message: 'Anda telah sukses login, mohon ditunggu...',
          title: 'Sukses login',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
    }

    dispatch(setLoading(false));
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
