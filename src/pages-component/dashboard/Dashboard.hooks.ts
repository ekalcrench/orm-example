import { useLayoutEffect, useState } from 'react';

// import { usePostSessionExtendMutation } from '@/api/user-session';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { postApi } from '@/constants';
import useErrorApi from '@/lib/custom-hooks/UseErrorApi';
import { fetchWithAuth } from '@/utils';
import { PaginatedPosts, PostParameter } from './Dashboard.types';
import { defaultParameter } from './Dashboard.constants';
import { useAppSelector } from '@/lib/Hooks';

export default function useDashboard() {
  const { onErrorApi } = useErrorApi();

  const profile = useAppSelector((state) => state.profile);

  const [isLoadingGetData, setIsLoadingGetData] = useState<boolean>(false);
  const [allPosts, setAllPosts] = useState<PaginatedPosts>();
  const [parameter, setParameter] = useState<PostParameter>(defaultParameter);
  const [isAllPost, setIsAllPost] = useState<boolean>(true);

  const onSuccessSubmitPost = () => {
    fetchPosts();
  };

  const fetchPosts = async () => {
    setIsLoadingGetData(true);

    const res = await fetchWithAuth(
      postApi.getAll,
      { method: 'GET' },
      { ...parameter, ...(!isAllPost && { email: profile?.email }) }
    );

    if (res.ok) {
      const { data, meta } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data, meta); // e.g., { message: "Login successful", token: "abc123" }
      setAllPosts({ data, meta });
      setIsLoadingGetData(false);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
      setIsLoadingGetData(false);
    }
  };

  useLayoutEffect(() => {
    fetchPosts();
  }, [isAllPost, JSON.stringify(profile)]);

  return {
    // State
    allPosts,
    isAllPost,
    isLoadingGetData,

    // Function
    onSuccessSubmitPost,
    setIsAllPost,
  };
}
