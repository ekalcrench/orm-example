import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function LoadingComponent() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem',
      }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingComponent;
