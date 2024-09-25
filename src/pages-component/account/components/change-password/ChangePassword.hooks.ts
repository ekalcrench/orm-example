import { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { usePostUpdatePasswordUserProfileMutation } from '@/api/user-profile';
import { paths, unauthorized, defaultMessage } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch } from '@/lib/Hooks';
import { removeAuth } from '@/utils';
import {
  passwordDefaultValue,
  passwordSchema,
} from './ChangePassword.constants';
import { ProfilePasswordForm, ProfilePassword } from './ChangePassword.types';

export default function useChangePassword() {
  const passwordFormMethod = useForm<ProfilePasswordForm>({
    mode: 'onChange',
    defaultValues: passwordDefaultValue,
    resolver: yupResolver(passwordSchema),
  });

  const { control, trigger } = passwordFormMethod;

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [updatePassword] = usePostUpdatePasswordUserProfileMutation();

  const [showOldPassword, setShowOldPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmationPassword, setShowConfirmationPassword] =
    useState<boolean>(false);

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const onErrorApi = async (error: any) => {
    let message;

    if (error?.status === 401) {
      await removeAuth();

      router.replace(paths.login);
      message = unauthorized;
    }

    const data = error.data;

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

  const handleSave = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    onUpdatePassword();
  };

  const onUpdatePassword = async () => {
    const values = passwordFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      const payload: ProfilePassword = {
        newPassword: values.newPassword,
        oldPassword: values.oldPassword,
      };

      await updatePassword(payload).unwrap();

      passwordFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update password',
          title: 'Sukses',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return {
    control,
    showConfirmationPassword,
    showNewPassword,
    showOldPassword,

    handleSave,
    setShowConfirmationPassword,
    setShowNewPassword,
    setShowOldPassword,
    trigger,
  };
}
