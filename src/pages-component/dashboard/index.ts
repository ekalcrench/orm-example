import dynamic from 'next/dynamic';

import { LoadingPage } from '@/components';
import Dashboard from './Dashboard';

export default dynamic(() => import('./Dashboard'), {
  loading: LoadingPage,
}) as typeof Dashboard;
