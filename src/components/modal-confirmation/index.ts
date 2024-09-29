import dynamic from 'next/dynamic';

import ModalConfirmation from './ModalConfirmation';

export default dynamic(
  () => import('./ModalConfirmation')
) as typeof ModalConfirmation;
