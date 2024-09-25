import dynamic from 'next/dynamic';

import { LoadingComponent } from '@/components';
import InformasiUser from './InformasiUser';

export default dynamic(() => import('./InformasiUser'), {
  loading: LoadingComponent,
}) as typeof InformasiUser;
