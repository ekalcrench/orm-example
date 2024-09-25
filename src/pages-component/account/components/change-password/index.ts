import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import ChangePassword from './ChangePassword';

export default dynamic(() => import('./ChangePassword'), {
  loading: LoadingComponent,
}) as typeof ChangePassword;
