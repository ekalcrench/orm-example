'use client';

import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid2 as Grid,
  Typography,
} from '@mui/material';
import Link from 'next/link';

import useDashboard from './Dashboard.hooks';
import { Avatar, DashboardContainer } from './Dashboard.styles';
import { PostForm } from './components';
import { CenteredBox, LeftBox } from '@/styles';
import exampleAvatar from '@/static/img/example-avatar.png';
import { paths } from '@/constants';
import { LoadingComponent } from '@/components';
import { formatDateddMMMyyyyhhmm } from '@/utils';

export default function Dashboard() {
  const {
    // State
    allPosts,
    isAllPost,
    isLoadingGetData,

    // Function
    onSuccessSubmitPost,
    setIsAllPost,
  } = useDashboard();

  return (
    <DashboardContainer>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12 }}>
          <PostForm onSuccessSubmit={onSuccessSubmitPost} />
        </Grid>
        <Grid size={{ xs: 12 }}>
          <LeftBox sx={{ gap: '12px', marginBottom: '12px' }}>
            <Button
              variant={isAllPost ? 'contained' : 'outlined'}
              onClick={() => setIsAllPost(true)}>
              All Post
            </Button>
            <Button
              variant={!isAllPost ? 'contained' : 'outlined'}
              onClick={() => setIsAllPost(false)}>
              My Post
            </Button>
          </LeftBox>
        </Grid>
        {allPosts?.data && allPosts?.data?.length > 0 ? (
          allPosts?.data.map((value) => {
            return (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={value.id}>
                <Card sx={{ padding: '0px !important', height: '100%' }}>
                  <Link href={paths.postDetail(value.id)}>
                    <CardActionArea
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                      }}>
                      <CardContent>
                        <LeftBox>
                          <Box>
                            <Avatar
                              src={
                                value.author?.profilePicture
                                  ? value.author?.profilePicture.length > 0
                                    ? value.author?.profilePicture
                                    : exampleAvatar.src
                                  : exampleAvatar.src
                              }
                              alt="avatar"
                            />
                          </Box>

                          <Box>
                            <Typography>{value.author.name}</Typography>
                            <Typography fontSize={12} fontWeight={300}>
                              {formatDateddMMMyyyyhhmm(value.createdDate)}
                            </Typography>
                          </Box>
                        </LeftBox>
                        <Box sx={{ marginTop: '16px' }}>
                          <Typography>{value.body}</Typography>
                        </Box>
                      </CardContent>
                      {value.image && (
                        <CardMedia
                          component="img"
                          height="140"
                          image={value.image}
                          alt="Post image"
                        />
                      )}
                    </CardActionArea>
                  </Link>
                </Card>
              </Grid>
            );
          })
        ) : isLoadingGetData ? (
          <Grid size={{ xs: 12 }}>
            <CenteredBox sx={{ marginTop: '24px' }}>
              <LoadingComponent />
            </CenteredBox>
          </Grid>
        ) : (
          <Grid size={{ xs: 12 }}>
            <Card>
              <CenteredBox>
                <Typography>There is no posts available</Typography>
              </CenteredBox>
            </Card>
          </Grid>
        )}
      </Grid>
    </DashboardContainer>
  );
}
