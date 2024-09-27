import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import pageNotFound from '@/static/svg/page-not-found.svg';
import CustomImage from '../custom-image';
import { ButtonBack } from './components';
import { NotFoundPageProps } from './NotFoundPage.types';

function NotFoundPage({
  buttonMessage,
  message,
  redirectPath,
  showButton,
}: NotFoundPageProps) {
  return (
    <Box
      sx={{
        minWidth: '100vw',
        minHeight: '100vh',
        width: 'auto',
        height: 'auto',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
      <CustomImage
        src={pageNotFound.src}
        alt="not found"
        width={340}
        height={250}
      />

      {message && (
        <Typography
          align="center"
          sx={{
            width: '600px',
            maxWidth: '90vw',
            marginTop: '2rem',
            marginBottom: '4rem',
          }}>
          {message}
        </Typography>
      )}

      {!!showButton && (
        <ButtonBack text={buttonMessage} redirectPath={redirectPath} />
      )}
    </Box>
  );
}

export default NotFoundPage;
