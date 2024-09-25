import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';

import './LoadingModal.scss';

function LoadingModal({ open }: { open: boolean }) {
  return (
    <Modal
      open={open}
      disablePortal
      disableEnforceFocus
      disableAutoFocus
      keepMounted>
      <Box className="loading-modal">
        <CircularProgress className="circular-progress" />

        <Typography className="text">Mohon ditunggu...</Typography>
      </Box>
    </Modal>
  );
}

export default LoadingModal;
