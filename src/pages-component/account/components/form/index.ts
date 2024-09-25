import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import Form from './Form';

export default dynamic(() => import('./Form'), {
  loading: LoadingComponent,
}) as typeof Form;
