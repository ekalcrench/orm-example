import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import LoadingComponent from '../loading-component';

function LoadingSubPage() {
  return (
    <Box sx={{ marginTop: '60px' }}>
      <LoadingComponent />

      <Typography align="center" sx={{ marginTop: '16px' }}>
        Please wait...
      </Typography>
    </Box>
  );
}

export default LoadingSubPage;
