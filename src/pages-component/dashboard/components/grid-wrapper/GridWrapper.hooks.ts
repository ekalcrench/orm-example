import { useLayoutEffect } from 'react';

import { usePostSessionExtendMutation } from '@/api/user-session';
import useProfile from '@/lib/custom-hooks/UseProfile';

export default function useGridWrapper() {
  const { isProfileComplete, profile } = useProfile({
    isNeedToBeLogout: true,
  });

  const [postSessionExtend] = usePostSessionExtendMutation();

  const extendUserSession = async () => {
    try {
      await postSessionExtend().unwrap();
    } catch (error) {
      console.log('error : ', error);
    }
  };

  useLayoutEffect(() => {
    console.log('extendSession');
    extendUserSession();
  }, []);

  return { isProfileComplete, profile };
}
