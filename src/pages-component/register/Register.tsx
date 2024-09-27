import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { CustomImage } from '@/components';
import { paths } from '@/constants';
import sibagiLogo from '@/static/svg/sibagi-logo.svg';
import { Form } from './components';
import './Register.scss';

function Register() {
  return (
    <Grid className="register-page" container>
      <Grid className="second-section-wrapper" size={{ xs: 12, sm: 6 }}>
        <Box className="second-section">
          <Box className="logo-wrapper">
            <Link href={paths.base}>
              <CustomImage
                src={sibagiLogo.src}
                alt="auth"
                width={153}
                height={39}
                priority
                quality={100}
              />
            </Link>
          </Box>

          <Box className="form-wrapper">
            <Typography variant="h4" fontWeight={700}>
              Sign Up
            </Typography>

            <Form />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Register;
