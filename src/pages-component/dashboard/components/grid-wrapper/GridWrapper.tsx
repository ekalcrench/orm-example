/* eslint-disable @next/next/no-img-element */
'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { paths } from '@/constants';
import exampleAvatar from '@/static/img/example-avatar.png';
import { LeftBox } from '@/styles';
import useGridWrapper from './GridWrapper.hooks';
import { ProfileCardStyled } from './GridWrapper.styles';

export default function GridWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isProfileComplete, profile } = useGridWrapper();

  const renderProfileCard = () => {
    return (
      <ProfileCardStyled isProfileComplete={isProfileComplete}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box className="logo-wrapper" sx={{ marginRight: '16px' }}>
            <img
              className="avatar"
              src={
                profile?.profilePictureUrl
                  ? profile?.profilePictureUrl.length > 0
                    ? profile?.profilePictureUrl
                    : exampleAvatar.src
                  : exampleAvatar.src
              }
              alt="avatar"
            />
          </Box>
          <Typography
            fontSize={'1.75rem'}
            fontWeight={500}
            {...(!isProfileComplete && { color: 'input.borderColor' })}>
            Akun
          </Typography>
        </Box>
        <LeftBox>
          <Typography
            className="body"
            fontWeight={300}
            {...(!isProfileComplete && { color: 'input.borderColor' })}>
            Atur, edit, dan simpan informasi data diri, password baru dan foto
            akun.
          </Typography>

          {/* <IconButton sx={{ marginLeft: '8px' }} onClick={handleClickCopyUrl}>
            <ContentCopyIcon
              sx={{ color: isProfileComplete ? 'inherit' : 'white' }}
            />
          </IconButton> */}
        </LeftBox>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            flex: 1,
            alignItems: 'flex-end',
          }}>
          <LeftBox sx={{ flexWrap: 'wrap' }} className="link-profile">
            <Link
              href={paths.account}
              style={{ marginTop: '16px', marginRight: '8px' }}>
              <Button className="button" variant="outlined">
                Edit Akun
              </Button>
            </Link>
          </LeftBox>
        </Box>
      </ProfileCardStyled>
    );
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={4} className="profile-card-wrapper-first">
        {renderProfileCard()}
      </Grid>

      {children}

      <Grid item xs={12} md={6} className="profile-card-wrapper-last">
        {renderProfileCard()}
      </Grid>
    </Grid>
  );
}
