import { useCallback, useEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import { Area } from 'react-easy-crop';
import { useForm } from 'react-hook-form';

import { usePostFileMutation } from '@/api/user-file';
import {
  usePostUpdateUserProfileMutation,
  usePostUpdateUsernameUserProfileMutation,
} from '@/api/user-profile';
import { defaultMessage, paths, unauthorized } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import {
  setProfilePictureUrl,
  setProfileUsername,
} from '@/lib/features/profile/Profile.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import { FileCategory } from '@/types';
import { getCroppedImg, readFile, removeAuth } from '@/utils';
import {
  profileDefaultValue,
  profileSchema,
  usernameDefaultValue,
  usernameSchema,
} from './InformasiUser.constants';
import {
  ProfileForm,
  ProfileUsernameForm,
  Profile,
} from './InformasiUser.types';

export default function useInformasiUser() {
  const inputFormMethod = useForm<ProfileForm>({
    mode: 'onChange',
    defaultValues: profileDefaultValue,
    resolver: yupResolver(profileSchema),
  });

  const usernameFormMethod = useForm<ProfileUsernameForm>({
    mode: 'onChange',
    defaultValues: usernameDefaultValue,
    resolver: yupResolver(usernameSchema),
  });

  const [postFile] = usePostFileMutation();
  const [updateProfile] = usePostUpdateUserProfileMutation();
  const [updateUsername] = usePostUpdateUsernameUserProfileMutation();

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  /**
   * State for Cropper
   */
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string>('');
  const [imageType, setImageType] = useState<string>('');
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  /**
   * End state for Cropper
   */

  const [selectedFile, setSelectedFile] = useState<any>({});
  const [preview, setPreview] = useState<any>({});

  const router = useRouter();

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

  const handleChangeFilePicture = async (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const fileType = file.type;
      const fileName = file.name;

      /**
       * Jika bukan gambar, maka selectedFile dan preview selain name ini tetap akan ditampilkan
       */
      if (
        !fileType.includes('image/png') &&
        !fileType.includes('image/gif') &&
        !fileType.includes('image/jpeg')
      ) {
        let selectedFileTemp = {};
        let previewTemp = {};
        Object.keys(selectedFile).forEach((key: string) => {
          if (key !== name) {
            selectedFileTemp = {
              ...selectedFileTemp,
              [key]: selectedFile[key],
            };
            previewTemp = {
              ...previewTemp,
              [key]: preview[key],
            };
          }
        });
        setSelectedFile(selectedFileTemp);
        setPreview(previewTemp);
        dispatch(
          handleOpenToast({
            open: true,
            message: 'Mohon pilih file gambar',
            type: 'error',
            onClose: handleCloseToast,
          })
        );
        return;
      }

      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setImageName(fileName);
      setImageType(fileType);

      // Reset the file input so the same file can be selected again
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  };

  const onCropCompleteHandler = useCallback(async () => {
    if (!croppedArea || !imageSrc) return;

    const croppedImageBlob = await getCroppedImg(imageSrc, croppedArea);
    const croppedImageFile = new File([croppedImageBlob], imageName, {
      type: imageType,
    });

    const preview = URL.createObjectURL(croppedImageBlob);

    setPreview({ profilePictureUrl: preview });
    setSelectedFile({ profilePictureUrl: croppedImageFile });
    setImageSrc(null);
  }, [croppedArea, imageSrc]);

  const onCancelCrop = () => {
    setImageSrc(null);
  };

  const handleSubmitFile = async () => {
    if (Object.keys(selectedFile).length === 0) {
      dispatch(
        handleOpenToast({
          open: true,
          message: 'Mohon maaf, gambar belum berubah',
          title: 'Warning',
          type: 'warning',
          onClose: handleCloseToast,
        })
      );

      return;
    }

    try {
      dispatch(setLoading(true));

      let formData;
      formData = new FormData();
      const fileCategory: FileCategory = 'PROFILE_PICTURE';
      formData.append('file', selectedFile['profilePictureUrl']);

      const res = await postFile({
        body: formData,
        params: { category: fileCategory },
      }).unwrap();

      inputFormMethod.setValue('profilePictureUrl', res.url);

      onUpdateProfile();
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleSubmitUsername = async () => {
    const dirtyFields = usernameFormMethod.formState.dirtyFields;

    if (Object.keys(dirtyFields).length === 0) {
      dispatch(
        handleOpenToast({
          open: true,
          message: 'Mohon maaf, username belum berubah',
          title: 'Warning',
          type: 'warning',
          onClose: handleCloseToast,
        })
      );

      return;
    }

    const isValid = await usernameFormMethod.trigger();

    if (!isValid) return;

    onUpdateUsername();
  };

  const init = () => {
    inputFormMethod.reset({
      ...inputFormMethod.getValues(),
      ...profile,
      pageConfig: {
        ...profile.pageConfig,
        quickAmount: profile.pageConfig?.quickAmount
          ? profile.pageConfig.quickAmount.map((value) => {
              return { total: value };
            })
          : [{ total: null }],
      },
    });
    usernameFormMethod.reset({ username: profile.username ?? '' });
  };

  const onUpdateProfile = async () => {
    const values = inputFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      const payload: Profile = {
        pageConfig: {
          ...values.pageConfig,
          quickAmount: values.pageConfig.quickAmount.map(
            (value) => value.total ?? 0
          ),
        },
        profilePictureUrl: values.profilePictureUrl,
        social: values.social,
      };

      await updateProfile(payload).unwrap();

      dispatch(setProfilePictureUrl(payload.profilePictureUrl));

      inputFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update profile',
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

  const onUpdateUsername = async () => {
    const values = usernameFormMethod.getValues();

    try {
      dispatch(setLoading(true));

      await updateUsername(values).unwrap();

      dispatch(setProfileUsername(values.username));

      usernameFormMethod.reset(values);

      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses update username',
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

  useEffect(() => {
    if (Object.keys(profile).length === 0) return;

    init();
  }, [JSON.stringify(profile)]);

  return {
    crop,
    imageSrc,
    inputFormMethod,
    inputRef,
    preview,
    selectedFile,
    usernameFormMethod,
    zoom,

    handleChangeFilePicture,
    handleSubmitFile,
    handleSubmitUsername,
    onCancelCrop,
    onCropCompleteHandler,
    setCrop,
    setCroppedArea,
    setZoom,
  };
}
