import dynamic from 'next/dynamic';

import LoadingComponent from '../loading-component';
import CustomInput from './CustomInput';

export default dynamic(() => import('./CustomInput'), {
  loading: LoadingComponent,
}) as typeof CustomInput;
