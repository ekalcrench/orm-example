import { useLayoutEffect, useState } from 'react';

import _ from 'lodash';
import { useRouter } from 'next/navigation';

import { defaultMessage, paths, unauthorized } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch } from '@/lib/Hooks';
import { removeAuth } from '@/utils';
import {
  useLazyGetUserSessionQuery,
  usePostTerminateSessionMutation,
} from '@/api/user-session';
import { UserSessionList } from './ConnectedDevices.types';
import useDialog from '@/lib/custom-hooks/UseDialog';

export default function useConnectedDevices() {
  const { dialogProps, hideDialog, setDialogWarning } = useDialog();

  const [getUserSession] = useLazyGetUserSessionQuery();
  const [postTerminateSession] = usePostTerminateSessionMutation();

  const dispatch = useAppDispatch();

  const router = useRouter();

  const [isLoadingGetData, setIsLoadingGetData] = useState<boolean>(false);
  const [userSessionList, setUserSessionList] = useState<UserSessionList[]>([]);

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

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  const fetchDetail = async () => {
    try {
      setIsLoadingGetData(true);
      const res = await getUserSession().unwrap();

      const activeSession = res.find((value) => value.currentSession);
      const notActiveSession =
        res.filter((value) => !value.currentSession) ?? [];

      if (activeSession) {
        setUserSessionList([activeSession, ...notActiveSession]);
      } else {
        setUserSessionList(notActiveSession);
      }
    } catch (error) {
      onErrorApi(error);
    } finally {
      setIsLoadingGetData(false);
    }
  };

  const handleClickRemoveSession = (
    device: string,
    encryptedSessionId: string
  ) => {
    setDialogWarning({
      message: `Apakah Anda yakin ingin logout di perangkat ${device}?`,
      onCancel: hideDialog,
      onConfirm: () => {
        hideDialog();
        onSubmitRemoveSession(encryptedSessionId);
      },
    });
  };

  const onSubmitRemoveSession = async (encryptedSessionId: string) => {
    try {
      dispatch(setLoading(true));
      await postTerminateSession(encryptedSessionId).unwrap();

      if (encryptedSessionId == userSessionList[0].encryptedSessionId) {
        await removeAuth();
        router.replace(paths.login);
      }

      onSuccessRemoveSession(encryptedSessionId);
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSuccessRemoveSession = (encryptedSessionId: string) => {
    setUserSessionList(
      userSessionList.filter(
        (value) => value.encryptedSessionId !== encryptedSessionId
      )
    );
  };

  const handleClickRemoveAllDevice = () => {
    setDialogWarning({
      message: `Apakah Anda yakin ingin logout dari semua perangkat?`,
      onCancel: hideDialog,
      onConfirm: () => {
        hideDialog();
        onSubmitRemoveAllDevice();
      },
    });
  };

  const onSubmitRemoveAllDevice = async () => {
    try {
      dispatch(setLoading(true));

      const currentSessionList = userSessionList[0];
      const remainingSessionList = userSessionList.filter(
        (value) =>
          value.encryptedSessionId !== currentSessionList.encryptedSessionId
      );

      // First remove all besides current session
      await Promise.allSettled([
        remainingSessionList.map((value) =>
          postTerminateSession(value.encryptedSessionId).unwrap()
        ),
      ]);

      // Then remove current session
      await postTerminateSession(
        currentSessionList.encryptedSessionId
      ).unwrap();

      await removeAuth();
      router.replace(paths.login);
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useLayoutEffect(() => {
    fetchDetail();
  }, []);

  return {
    dialogProps,
    isLoadingGetData,
    userSessionList,

    handleClickRemoveAllDevice,
    handleClickRemoveSession,
  };
}
