/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ComputerIcon from '@mui/icons-material/Computer';

import { LoadingComponent, ModalConfirmation } from '@/components';
import { BoxFlexEnd, CenteredBox, LeftBox, SpaceBetweenBox } from '@/styles';
import useConnectedDevices from './ConnectedDevices.hooks';
import { FormContainer } from './ConnectedDevices.styles';
import Chip from '@mui/material/Chip';
import { Fragment } from 'react';
import { formatDateddMMMyyyyhhmm } from '@/utils';

function ConnectedDevices() {
  const {
    dialogProps,
    isLoadingGetData,
    userSessionList,

    handleClickRemoveAllDevice,
    handleClickRemoveSession,
  } = useConnectedDevices();

  const renderUserSessionList = () => {
    return userSessionList.map((userSession, index) => {
      return (
        <Grid container item xs={12} spacing={3} key={index}>
          <Grid item xs={12}>
            <SpaceBetweenBox>
              <LeftBox sx={{ columnGap: { xs: '16px', sm: '24px' }, flex: 1 }}>
                <ComputerIcon sx={{ fontSize: '40px' }} color="primary" />

                <Box
                  sx={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <Typography sx={{ fontWeight: 600 }}>
                    {userSession.device}
                  </Typography>
                  <Typography variant="body2">
                    {userSession.location ?? '-'}
                  </Typography>
                  {index === 0 ? (
                    <Chip
                      label="Perangkat sekarang"
                      color="primary"
                      sx={{ color: 'common.white' }}
                    />
                  ) : (
                    <Typography variant="body2">
                      {`Terakhir aktif: ${formatDateddMMMyyyyhhmm(
                        userSession.lastActiveAt
                      )}`}
                    </Typography>
                  )}
                </Box>
              </LeftBox>

              <Button
                variant="text"
                color="tangerine"
                onClick={() =>
                  handleClickRemoveSession(
                    userSession.device,
                    userSession.encryptedSessionId
                  )
                }>
                Keluar
              </Button>
            </SpaceBetweenBox>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>

          {index + 1 === userSessionList.length && (
            <Grid item xs={12}>
              <BoxFlexEnd>
                <Button
                  variant="text"
                  color="tangerine"
                  onClick={handleClickRemoveAllDevice}>
                  Keluar dari semua perangkat
                </Button>
              </BoxFlexEnd>
            </Grid>
          )}
        </Grid>
      );
    });
  };

  return (
    <Fragment>
      <ModalConfirmation {...dialogProps} />

      <Card sx={{ height: '100%', boxSizing: 'border-box' }}>
        <Typography variant="h5" fontWeight={500} sx={{ marginBottom: '2rem' }}>
          Perangkat Terhubung
        </Typography>

        <FormContainer>
          <Grid container item spacing={3} xs={12}>
            <Grid item xs={12}>
              <Box sx={{ marginBottom: '24px' }}>
                <Typography sx={{ marginBottom: '8px' }}>
                  {`Terdapat ${userSessionList.length} perangkat yang login di akunmu`}
                </Typography>
                <Typography>
                  Bila terdapat perangkat tidak dikenal, segera klik "Keluar"
                  dan ubah kata sandi
                </Typography>
              </Box>
            </Grid>

            {isLoadingGetData ? (
              <Grid item xs={12}>
                <CenteredBox sx={{ marginTop: '20px', marginBottom: '24px' }}>
                  <LoadingComponent />
                </CenteredBox>
              </Grid>
            ) : (
              renderUserSessionList()
            )}
          </Grid>
        </FormContainer>
      </Card>
    </Fragment>
  );
}

export default ConnectedDevices;
