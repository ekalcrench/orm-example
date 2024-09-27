'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { defaultMessage, paths, unauthorized, userApi } from '@/constants';
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
// import { createUser } from '@/prisma/User';
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
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false);

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const onErrorApi = async (
    errorMessage: string,
    isRemoveAuth: boolean = false
  ) => {
    let message = errorMessage;

    if (isRemoveAuth) {
      await removeAuth();

      router.replace(paths.login);
      message = unauthorized;
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

      const body: Omit<UserModel, 'id'> = {
        email: values.email,
        name: values.name,
        password: values.password,
      };

      const res = await fetch(userApi.register, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      console.log('res nya ini ya : ', res);

      if (!res.ok) {
        const errorName = (await res.json()) as unknown as { name: string };
        throw new Error(errorName.name);
      }

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses mendaftar Anda akan diarahkan untuk login',
          title: 'Sukses',
          type: 'success',
          onClose: handleCloseToast,
        })
      );

      router.replace(paths.login);
    } catch (error: any) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      onErrorApi(errorMessage);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    // State
    inputFormMethod,
    showConfirmationPassword,
    showPassword,

    // Function
    handleSubmit,
    setShowConfirmationPassword,
    setShowPassword,
  };
}

export default useCustomForm;
