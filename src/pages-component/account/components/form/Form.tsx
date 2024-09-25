'use client';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Grid from '@mui/material/Grid';
import _ from 'lodash';

import { LoadingPage } from '@/components';
import ConnectedDevices from '../connected-devices';
import InformasiUser from '../informasi-user';
import Password from '../change-password';
import useProfileForm, { ProfileFormContext } from './Form.hooks';
import { ProfileCard, ProfileContainer } from './Form.styles';
import { Box, Button, Card, Divider, Typography } from '@mui/material';

function Form() {
  const {
    // State
    inputFormMethod,
    isLoading,
    passwordFormMethod,
    usernameFormMethod,

    // Function
    onUpdatePassword,
    onUpdateProfile,
    onUpdateUsername,
  } = useProfileForm();

  if (isLoading || _.isNil(inputFormMethod.watch('email'))) {
    return <LoadingPage />;
  }

  return (
    <ProfileContainer>
      <ProfileFormContext.Provider
        value={{
          inputFormMethod,
          passwordFormMethod,
          usernameFormMethod,
          onUpdatePassword,
          onUpdateProfile,
          onUpdateUsername,
        }}>
        <ProfileCard>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
              <Card sx={{ height: '100%', boxSizing: 'border-box' }}>
                <Typography
                  variant="h5"
                  fontWeight={500}
                  sx={{ marginBottom: '2rem' }}>
                  Akun
                </Typography>

                <Box>
                  <Button
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    variant="text"
                    color="primary">
                    Informasi Pengguna <ArrowForwardIosIcon />
                  </Button>
                </Box>

                <Box sx={{ marginBottom: '20px', marginTop: '20px' }}>
                  <Divider />
                </Box>

                <Box>
                  <Button
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    variant="text"
                    color="regalBlue">
                    Ganti Password <ArrowForwardIosIcon />
                  </Button>
                </Box>

                <Box sx={{ marginBottom: '20px', marginTop: '20px' }}>
                  <Divider />
                </Box>

                <Box>
                  <Button
                    sx={{
                      width: '100%',
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                    variant="text"
                    color="regalBlue">
                    Perangkat Terhubung <ArrowForwardIosIcon />
                  </Button>
                </Box>
              </Card>
            </Grid>

            {/* Informasi User */}
            <Grid item xs={12} sm={12} md={7}>
              <InformasiUser />
            </Grid>
          </Grid>
        </ProfileCard>
      </ProfileFormContext.Provider>
    </ProfileContainer>
  );
}

export default Form;
