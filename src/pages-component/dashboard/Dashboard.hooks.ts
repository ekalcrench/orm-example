import { useLayoutEffect } from 'react';

// import { usePostSessionExtendMutation } from '@/api/user-session';
import useProfile from '@/lib/custom-hooks/UseProfile';

export default function useDashboard() {
  const { profile } = useProfile();

  return { profile };
}
