/* eslint-disable @next/next/no-img-element */
'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Cropper from 'react-easy-crop';

import { CustomInput } from '@/components';
import { LeftBox } from '@/styles';
import exampleAvatar from '@/static/img/example-avatar.png';
import useInformasiUser from './InformasiUser.hooks';
import {
  Avatar,
  LogoContainer,
  FormContainer,
  InlineButton,
  LabelChooseFile,
} from './InformasiUser.styles';

function InformasiUser() {
  const {
    crop,
    imageSrc,
    inputFormMethod,
    inputRef,
    preview,
    selectedFile,
    usernameFormMethod,
    zoom,

    handleChangeFilePicture,
    handleSubmitFile,
    handleSubmitUsername,
    onCancelCrop,
    onCropCompleteHandler,
    setCrop,
    setCroppedArea,
    setZoom,
  } = useInformasiUser();

  return (
    <Card sx={{ height: '100%', boxSizing: 'border-box' }}>
      <Typography variant="h5" fontWeight={500} sx={{ marginBottom: '2rem' }}>
        Informasi Pengguna
      </Typography>

      <LogoContainer>
        {imageSrc && (
          <Box sx={{ position: 'relative', width: '300px', height: '300px' }}>
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={(croppedAreaPercentage, croppedAreaPixels) => {
                setCroppedArea(croppedAreaPixels);
              }}
            />
          </Box>
        )}

        {!imageSrc && (
          <Avatar
            src={
              preview?.profilePictureUrl
                ? preview?.profilePictureUrl
                : inputFormMethod.watch('profilePictureUrl').length > 0
                ? inputFormMethod.watch('profilePictureUrl')
                : exampleAvatar.src
            }
            alt="avatar"
          />
        )}
      </LogoContainer>

      <FormContainer>
        <Grid container spacing={0}>
          <Grid container item xs={12} columnSpacing={2}>
            <Grid item xs={9}>
              <input
                id="profilePictureUrl"
                type="file"
                multiple={false}
                onChange={(event) =>
                  handleChangeFilePicture(event, 'profilePictureUrl')
                }
                ref={inputRef}
                accept="image/png, image/gif, image/jpeg"
                style={{ display: 'none' }}
              />
              <LeftBox sx={{ marginBottom: '1.25rem' }}>
                {imageSrc && (
                  <Button
                    onClick={onCropCompleteHandler}
                    sx={{ height: { xs: '48px', sm: '54px' } }}>
                    Crop
                  </Button>
                )}
                {!imageSrc && (
                  <LabelChooseFile htmlFor="profilePictureUrl">
                    Pilih Gambar
                  </LabelChooseFile>
                )}
                <Box sx={{ marginLeft: '8px' }}>
                  {selectedFile['profilePictureUrl'] ? (
                    <Typography>
                      {selectedFile['profilePictureUrl'].name}
                    </Typography>
                  ) : (
                    <Typography>
                      {imageSrc ? 'Please crop image' : 'No file chosen'}
                    </Typography>
                  )}
                </Box>
              </LeftBox>
              {/* {errors.profilePictureUrl && <div>{errors.profilePictureUrl}</div>} */}
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                {imageSrc && (
                  <InlineButton onClick={onCancelCrop} color="error">
                    Batal
                  </InlineButton>
                )}
                {!imageSrc && (
                  <InlineButton onClick={handleSubmitFile}>Simpan</InlineButton>
                )}
              </Box>
            </Grid>
          </Grid>
          <Grid container item xs={12} columnSpacing={2}>
            <Grid item xs={9}>
              <CustomInput
                label="Username"
                name="username"
                control={usernameFormMethod.control}
                trigger={usernameFormMethod.trigger}
                placeholder="Masukan username"
                renderErrorMessage
                maxChar={31}
              />
            </Grid>
            <Grid item xs={3}>
              <Box sx={{ position: 'relative', height: '100%', width: '100%' }}>
                <InlineButton onClick={handleSubmitUsername}>
                  Simpan
                </InlineButton>
              </Box>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              label="Email"
              name="email"
              control={inputFormMethod.control}
              placeholder="Masukan email"
              disabled
            />
          </Grid>
        </Grid>
      </FormContainer>
    </Card>
  );
}

export default InformasiUser;
