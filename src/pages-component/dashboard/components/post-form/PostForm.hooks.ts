import { useLayoutEffect, useRef, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { defaultMessage, paths, postApi, unauthorized } from '@/constants';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import { ProfileSlice } from '@/lib/features/profile/Profile.slice';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import { postDefaultValue, postSchema } from './PostForm.constants';
import { PostForm, PostFormProps, PostPayload } from './PostForm.types';
import useErrorApi from '@/lib/custom-hooks/UseErrorApi';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { fetchWithAuth } from '@/utils';

export default function usePostForm(props: PostFormProps) {
  const { onErrorApi } = useErrorApi();
  const { isLoadingGetData: isLoadingProfile, profile } = useProfile();

  const dispatch = useAppDispatch();

  const inputFormMethod = useForm<PostForm>({
    mode: 'onChange',
    defaultValues: postDefaultValue,
    resolver: yupResolver(postSchema),
  });

  const { control, formState, getValues, reset, setValue, trigger } =
    inputFormMethod;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoadingPost, setIsLoadingPost] = useState<boolean>(false);

  const handleCloseToast = () => {
    dispatch(setCloseToast());
  };

  // This function converts the selected image file to base64
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  // Trigger the file input when the icon is clicked
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    onSubmit();
  };

  const onSubmit = async () => {
    const values = getValues();

    setIsLoadingPost(true);

    const res = await fetchWithAuth(postApi.create, {
      method: 'POST',
      body: JSON.stringify({
        body: values.body,
        image: values.image,
      }),
    });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data); // e.g., { message: "Login successful", token: "abc123" }
      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses post terbaru',
          title: 'Sukses login',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
      reset();
      props.onSuccessSubmit();
      setIsLoadingPost(false);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
      setIsLoadingPost(false);
    }
  };

  return {
    // State
    control,
    fileInputRef,
    formState,
    isLoadingPost,
    isLoadingProfile,
    profile,

    // Function
    handleImageUpload,
    handleSubmit,
    setValue,
    trigger,
    triggerFileInput,
  };
}
