import dynamic from 'next/dynamic';

import LoadingComponent from '../loading-component';
import CustomSnackbar from './CustomSnackbar';

export default dynamic(() => import('./CustomSnackbar'), {
  loading: LoadingComponent,
}) as typeof CustomSnackbar;
