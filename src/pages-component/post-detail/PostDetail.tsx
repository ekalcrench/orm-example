/* eslint-disable @next/next/no-img-element */
'use client';

import Box from '@mui/material/Box';
import {
  Avatar,
  PostDetailCard,
  PostDetailContainer,
  PostDetailInpuText,
} from './PostDetail.styles';
import { PostDetailProps } from './PostDetail.types';
import usePostDetail from './PostDetail.hooks';
import { CustomInput, LoadingComponent, ModalConfirmation } from '@/components';
import { BoxFlexEnd, CenteredBox, LeftBox, SpaceBetweenBox } from '@/styles';
import exampleAvatar from '@/static/img/example-avatar.png';
import { Button, IconButton, Typography } from '@mui/material';
import { formatDateddMMMyyyyhhmm } from '@/utils';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useWatch } from 'react-hook-form';
import CloseIcon from '@mui/icons-material/Close';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';

function PostDetail(props: PostDetailProps) {
  const {
    // State
    control,
    dialogProps,
    fileInputRef,
    formState,
    post,
    isEditable,
    isLoadingGetData,
    isLoadingUpdate,
    profile,

    // Function
    handleClickDelete,
    handleImageUpload,
    handleUpdate,
    setIsEditable,
    setValue,
    trigger,
    triggerFileInput,
  } = usePostDetail(props);

  const { body, image } = useWatch({ control });

  return (
    <PostDetailContainer>
      <ModalConfirmation {...dialogProps} />

      {isLoadingGetData ? (
        <Box sx={{ marginTop: '20px' }}>
          <LoadingComponent />
        </Box>
      ) : post ? (
        <Box>
          {profile?.email === post?.author.email && (
            <BoxFlexEnd sx={{ gap: '12px', marginBottom: '24px' }}>
              <Button
                sx={{ padding: '12px' }}
                color="secondary"
                onClick={() => setIsEditable(true)}>
                <EditIcon />
              </Button>
              <Button
                sx={{ padding: '12px' }}
                color="error"
                onClick={handleClickDelete}>
                <DeleteIcon />
              </Button>
            </BoxFlexEnd>
          )}

          {/* NGL Input */}
          <PostDetailCard
            sx={{
              borderColor: formState.errors?.body
                ? 'error.main'
                : 'input.borderColor',
            }}>
            <LeftBox sx={{ gap: '8px' }}>
              <CenteredBox>
                <Avatar
                  src={
                    post.author?.profilePicture
                      ? post.author?.profilePicture.length > 0
                        ? post.author?.profilePicture
                        : exampleAvatar.src
                      : exampleAvatar.src
                  }
                  alt="avatar"
                />
              </CenteredBox>

              <Box>
                <Typography>{post.author.name}</Typography>
                <Typography fontSize={12} fontWeight={300}>
                  Created at {formatDateddMMMyyyyhhmm(post.createdDate)}
                </Typography>
                <Typography fontSize={12} fontWeight={300}>
                  Last Modified at{' '}
                  {formatDateddMMMyyyyhhmm(post.lastModifiedDate)}
                </Typography>
              </Box>
            </LeftBox>
          </PostDetailCard>

          <PostDetailInpuText
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
              {isLoadingUpdate ? (
                <CenteredBox
                  sx={{
                    width: '100%',
                    marginTop: '16px',
                    marginBottom: '20px',
                  }}>
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
                      '& .MuiInputBase-input.Mui-disabled': {
                        backgroundColor: 'white',
                        WebkitTextFillColor: '#62AD9E',
                      },
                    },
                    multiline: true,
                    minRows: 4,
                    maxRows: 6,
                  }}
                  maxChar={301}
                  boxFieldWrapperProps={{ sx: { width: '100%' } }}
                  name="body"
                  control={control}
                  trigger={trigger}
                  placeholder="What is happening?"
                  disabled={!isEditable}
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
                  <IconButton
                    disabled={!isEditable}
                    color="primary"
                    onClick={() => setValue('image', '')}>
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
                  disabled={isLoadingUpdate || !isEditable}
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
                    handleUpdate();
                  }}
                  disabled={
                    !body ||
                    body?.length === 0 ||
                    isLoadingUpdate ||
                    !isEditable
                  }>
                  Update
                </Button>
              </Box>
            </SpaceBetweenBox>
          </PostDetailInpuText>
        </Box>
      ) : (
        <Box sx={{ marginTop: '20px' }}>
          <Typography>There is no data found</Typography>
        </Box>
      )}
    </PostDetailContainer>
  );
}

export default PostDetail;
