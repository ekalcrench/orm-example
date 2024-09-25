'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { defaultMessage, paths, unauthorized } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch } from '@/lib/Hooks';
import { removeAuth } from '@/utils';
import { registerDefaultValue, registerSchema } from './Form.constants';
import { RegisterForm } from './Form.types';
import { UserModel } from '@/types';
import { createUser } from '@/prisma/User';
import { useState } from 'react';

function useCustomForm() {
  const inputFormMethod = useForm<RegisterForm>({
    mode: 'onChange',
    defaultValues: registerDefaultValue,
    resolver: yupResolver(registerSchema),
  });

  const { getFieldState, getValues, trigger } = inputFormMethod;

  const dispatch = useAppDispatch();

  const router = useRouter();

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

    if (!isValid) {
      const email = getFieldState('email');

      if (email.invalid) {
        dispatch(
          handleOpenToast({
            open: true,
            message: 'Mohon masukan email yang benar',
            type: 'error',
            onClose: handleCloseToast,
          })
        );
      } else {
        dispatch(
          handleOpenToast({
            open: true,
            message: 'Mohon klik semua persyaratan',
            type: 'error',
            onClose: handleCloseToast,
          })
        );
      }

      return;
    }

    onSubmit();
  };

  const onSubmit = async () => {
    const values = getValues();

    try {
      dispatch(setLoading(true));

      const res = await createUser({
        email: values.email,
        name: values.name,
        password: values.password,
      });

      console.log('res nya ini ya : ', res);
      // await postUserAuthRegistration(data).unwrap();

      // router.push(paths.registerSuccess);
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
