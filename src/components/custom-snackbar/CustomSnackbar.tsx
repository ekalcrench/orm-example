'use client';

import Box from '@mui/material/Box';
import Slide, { SlideProps } from '@mui/material/Slide';
import Snackbar from '@mui/material/Snackbar';
import Typography from '@mui/material/Typography';

import errorToastIcon from '@/static/svg/error-toast-icon.svg';
import successToastIcon from '@/static/svg/success-toast-icon.svg';
import warningToastIcon from '@/static/svg/warning-toast-icon.svg';
import CustomImage from '../custom-image';
import { CustomSnackbarProps, SnackbarBody } from './CustomSnackbar.types';

function SlideTransition(props: SlideProps) {
  return <Slide {...props} direction="down" />;
}

function SuccessSnackbarBody({ message, title }: SnackbarBody) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'common.white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'success.main',
      }}>
      <Box sx={{ marginRight: '1rem' }}>
        <CustomImage
          src={successToastIcon.src}
          alt="success"
          width={24}
          height={24}
        />
      </Box>
      <Box>
        {title && (
          <Typography
            fontWeight={700}
            fontSize={'0.875rem'}
            color="success.main">
            {title}
          </Typography>
        )}
        <Typography fontSize={'0.75rem'} sx={{ marginTop: '4px' }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

function ErrorSnackbarBody({ message, title }: SnackbarBody) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'common.white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'error.main',
      }}>
      <Box sx={{ marginRight: '1rem' }}>
        <CustomImage
          src={errorToastIcon.src}
          alt="error"
          width={24}
          height={24}
        />
      </Box>
      <Box>
        {title && (
          <Typography fontWeight={700} fontSize={'0.875rem'} color="error.main">
            {title}
          </Typography>
        )}
        <Typography fontSize={'0.75rem'} sx={{ marginTop: '4px' }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

function WarningSnackbarBody({ message, title }: SnackbarBody) {
  return (
    <Box
      sx={{
        display: 'flex',
        backgroundColor: 'common.white',
        padding: '1.5rem',
        borderRadius: '0.75rem',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: 'warning.main',
      }}>
      <Box sx={{ marginRight: '1rem' }}>
        <CustomImage
          src={warningToastIcon.src}
          alt="warning"
          width={24}
          height={24}
        />
      </Box>
      <Box>
        {title && (
          <Typography
            fontWeight={700}
            fontSize={'0.875rem'}
            color="warning.main">
            {title}
          </Typography>
        )}
        <Typography fontSize={'0.75rem'} sx={{ marginTop: '4px' }}>
          {message}
        </Typography>
      </Box>
    </Box>
  );
}

function CustomSnackbar({
  message,
  title,
  type,
  ...props
}: CustomSnackbarProps) {
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      autoHideDuration={3000}
      TransitionComponent={SlideTransition}
      {...props}>
      <Box>
        {type === 'success' ? (
          <SuccessSnackbarBody message={message} title={title} />
        ) : undefined}
        {type === 'error' ? (
          <ErrorSnackbarBody message={message} title={title} />
        ) : undefined}
        {type === 'warning' ? (
          <WarningSnackbarBody message={message} title={title} />
        ) : undefined}
      </Box>
    </Snackbar>
  );
}

export default CustomSnackbar;
