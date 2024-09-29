import { useLayoutEffect, useRef, useState } from 'react';

// import { usePostSessionExtendMutation } from '@/api/user-session';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { paths, postApi } from '@/constants';
import useErrorApi from '@/lib/custom-hooks/UseErrorApi';
import { fetchWithAuth } from '@/utils';
import { PostDetailProps } from './PostDetail.types';
import { useForm } from 'react-hook-form';
import { postDefaultValue, postSchema } from './PostDetail.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { PostData } from '../dashboard/Dashboard.types';
import useDialog from '@/lib/custom-hooks/UseDialog';
import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import {
  handleOpenToast,
  setCloseToast,
} from '@/lib/features/toast/Toast.slice';
import { useRouter } from 'next/navigation';
import { PostForm } from '../dashboard/components/post-form/PostForm.types';

export default function usePostDetail(props: PostDetailProps) {
  const { onErrorApi } = useErrorApi();
  const { dialogProps, hideDialog, setDialogWarning } = useDialog();

  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.profile);

  const router = useRouter();

  const inputFormMethod = useForm<PostForm>({
    mode: 'onChange',
    defaultValues: postDefaultValue,
    resolver: yupResolver(postSchema),
  });

  const { control, formState, getValues, reset, setValue, trigger } =
    inputFormMethod;

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isLoadingUpdate, setIsLoadingUpdate] = useState<boolean>(false);
  const [isLoadingGetData, setIsLoadingGetData] = useState<boolean>(false);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [post, setPost] = useState<PostData>();

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

  const handleClickDelete = () => {
    setDialogWarning({
      message: 'Apakah Anda yakin ingin menghapus postingan ini?',
      onCancel: hideDialog,
      onConfirm: () => {
        hideDialog();
        onDelete();
      },
    });
  };

  const onDelete = async () => {
    setIsLoadingGetData(true);

    const res = await fetchWithAuth(postApi.findPostById(props.postId), {
      method: 'DELETE',
    });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success get Detail Post:', data); // e.g., { message: "Login successful", token: "abc123" }
      dispatch(
        handleOpenToast({
          open: true,
          message: 'Sukses post terbaru',
          title: 'Sukses login',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
      router.replace(paths.dashboard);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
      setIsLoadingGetData(false);
    }
  };

  const fetchPosts = async () => {
    setIsLoadingGetData(true);

    const res = await fetchWithAuth(postApi.findPostById(props.postId), {
      method: 'GET',
    });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success get Detail Post:', data); // e.g., { message: "Login successful", token: "abc123" }
      setPost(data);
      reset({ body: data.body, image: data.image });
      setIsLoadingGetData(false);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
      setIsLoadingGetData(false);
    }
  };

  const handleUpdate = async () => {
    const isValid = await trigger();

    if (!isValid) return;

    onUpdate();
  };

  const onUpdate = async () => {
    const values = getValues();

    setIsLoadingUpdate(true);

    const res = await fetchWithAuth(postApi.findPostById(props.postId), {
      method: 'PUT',
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
          message: 'Sukses update post',
          title: 'Sukses login',
          type: 'success',
          onClose: handleCloseToast,
        })
      );
      fetchPosts();
      setIsEditable(false);
      setIsLoadingUpdate(false);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
      setIsLoadingUpdate(false);
    }
  };

  useLayoutEffect(() => {
    fetchPosts();
  }, []);

  return {
    // State
    control,
    dialogProps,
    fileInputRef,
    formState,
    post,
    isEditable,
    isLoadingGetData,
    isLoadingUpdate,
    profile,

    // Function
    handleClickDelete,
    handleImageUpload,
    handleUpdate,
    setIsEditable,
    setValue,
    trigger,
    triggerFileInput,
  };
}
