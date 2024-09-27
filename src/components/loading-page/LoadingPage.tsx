import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';

import './LoadingPage.scss';

function LoadingPage() {
  return (
    <Box className="loading-page">
      <CircularProgress className="circular-progress" />

      <Typography className="text">Mohon ditunggu, sedang memuat...</Typography>
    </Box>
  );
}

export default LoadingPage;
