import dynamic from 'next/dynamic';

import LoadingComponent from '../loading-component';
import CustomCheckbox from './CustomCheckbox';

export default dynamic(() => import('./CustomCheckbox'), {
  loading: LoadingComponent,
}) as typeof CustomCheckbox;
