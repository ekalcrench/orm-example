import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import ButtonBack from './ButtonBack';

export default dynamic(() => import('./ButtonBack'), {
  loading: LoadingComponent,
}) as typeof ButtonBack;
