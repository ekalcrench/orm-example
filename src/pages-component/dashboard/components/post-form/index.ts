import dynamic from 'next/dynamic';

import { LoadingPage } from '@/components';
import UsernameQme from './PostForm';

export default dynamic(() => import('./PostForm'), {
  loading: LoadingPage,
}) as typeof UsernameQme;
