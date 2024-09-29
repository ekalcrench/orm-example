import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import UsernameQme from './PostForm';

export default dynamic(() => import('./PostForm'), {
  loading: LoadingComponent,
}) as typeof UsernameQme;
