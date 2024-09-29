import dynamic from 'next/dynamic';

import { LoadingPage } from '@/components';
import PostDetail from './PostDetail';

export default dynamic(() => import('./PostDetail'), {
  loading: LoadingPage,
}) as typeof PostDetail;
