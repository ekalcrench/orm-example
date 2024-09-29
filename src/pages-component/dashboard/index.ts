import dynamic from 'next/dynamic';

import { LoadingSubPage } from '@/components';
import Dashboard from './Dashboard';

export default dynamic(() => import('./Dashboard'), {
  loading: LoadingSubPage,
}) as typeof Dashboard;
