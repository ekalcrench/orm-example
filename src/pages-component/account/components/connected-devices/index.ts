import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import ConnectedDevices from './ConnectedDevices';

export default dynamic(() => import('./ConnectedDevices'), {
  loading: LoadingComponent,
}) as typeof ConnectedDevices;
