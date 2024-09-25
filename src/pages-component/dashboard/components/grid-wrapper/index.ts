import dynamic from 'next/dynamic';

import { LoadingSubPage } from '@/components';
import GridWrapper from './GridWrapper';

export default dynamic(() => import('./GridWrapper'), {
  loading: LoadingSubPage,
}) as typeof GridWrapper;
