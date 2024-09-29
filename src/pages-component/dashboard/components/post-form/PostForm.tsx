/* eslint-disable @next/next/no-img-element */
'use client';

import { Fragment } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useWatch } from 'react-hook-form';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import { CustomInput, LoadingComponent } from '@/components';
import exampleAvatarProfile from '@/static/img/example-avatar-profile.png';
import { CenteredBox, LeftBox, SpaceBetweenBox } from '@/styles';
import usePostForm from './PostForm.hooks';
import { Avatar, QmeCard, QmeCardInpuText } from './PostForm.styles';
import CloseIcon from '@mui/icons-material/Close';
import './PostForm.scss';
import { PostFormProps } from './PostForm.types';

export default function PostFormPage(props: PostFormProps) {
  const {
    // State
    control,
    fileInputRef,
    formState,
    isLoadingPost,
    isLoadingProfile,
    profile,

    // Function
    handleImageUpload,
    handleSubmit,
    setValue,
    trigger,
    triggerFileInput,
  } = usePostForm(props);

  const { body, image } = useWatch({ control });

  return (
    <Box sx={{ marginBottom: '24px' }}>
      {/* NGL Input */}
      <QmeCard
        sx={{
          borderColor: formState.errors?.body
            ? 'error.main'
            : 'input.borderColor',
        }}>
        {isLoadingProfile ? (
          <LoadingComponent />
        ) : (
          <Fragment>
            <CenteredBox>
              <Avatar
                src={
                  profile?.profilePicture
                    ? profile?.profilePicture.length > 0
                      ? profile?.profilePicture
                      : exampleAvatarProfile.src
                    : exampleAvatarProfile.src
                }
                alt="avatar"
              />
            </CenteredBox>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <Typography>{profile?.name}</Typography>
            </Box>
          </Fragment>
        )}
      </QmeCard>
      <QmeCardInpuText
        sx={{
          borderTop: 'none',
          borderColor: formState.errors?.body
            ? 'error.main'
            : 'input.borderColor',
        }}>
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            paddingBottom: '24px',
            display: 'flex',
          }}>
          {isLoadingPost ? (
            <CenteredBox
              sx={{ width: '100%', marginTop: '16px', marginBottom: '20px' }}>
              <LoadingComponent />
            </CenteredBox>
          ) : (
            <CustomInput
              textFieldProps={{
                sx: {
                  padding: 0,
                  '& .MuiInputBase-root': {
                    padding: '0px !important',
                  },
                  '& .MuiOutlinedInput-notchedOutline': {
                    border: 'none !important',
                  },
                  '& .MuiInputBase-input': {
                    fontSize: { xs: '16px', sm: '20px' },
                    lineHeight: 1.5,
                  },
                },
                multiline: true,
                minRows: 2,
                maxRows: 4,
              }}
              maxChar={301}
              boxFieldWrapperProps={{ sx: { width: '100%' } }}
              name="body"
              control={control}
              trigger={trigger}
              placeholder="What is happening?"
            />
          )}
        </Box>

        {image && image?.length > 0 && (
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              maxHeight: '200px',
              overflow: 'hidden',
            }}>
            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
              <IconButton color="primary" onClick={() => setValue('image', '')}>
                <CloseIcon color="primary" />
              </IconButton>
            </Box>
            <img
              src={image}
              alt="Selected"
              style={{
                width: '100%',
                objectFit: 'scale-down',
              }}
            />
          </Box>
        )}
        <SpaceBetweenBox>
          <Box>
            <IconButton
              color="primary"
              disabled={isLoadingPost}
              onClick={triggerFileInput}>
              <InsertPhotoIcon color="primary" />
            </IconButton>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleImageUpload}
            />
          </Box>

          <Box>
            <Button
              sx={{ borderRadius: '20px' }}
              onClick={(event) => {
                event.preventDefault();
                handleSubmit();
              }}
              disabled={!body || body?.length === 0 || isLoadingPost}>
              Post
            </Button>
          </Box>
        </SpaceBetweenBox>
      </QmeCardInpuText>
      {formState.errors?.body && (
        <LeftBox sx={{ width: '100%', marginTop: '8px', marginLeft: '1rem' }}>
          <Typography variant="body2" color="error">
            {formState.errors?.body?.message}
          </Typography>
        </LeftBox>
      )}
    </Box>
  );
}
