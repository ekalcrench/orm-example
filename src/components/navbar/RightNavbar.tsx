/* eslint-disable @next/next/no-img-element */
'use client';

import { Fragment, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import { paths } from '@/constants';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import { useAppDispatch } from '@/lib/Hooks';
import exampleAvatar from '@/static/img/example-avatar.png';
import { removeAuth } from '@/utils';
import { Avatar } from './Navbar.styles';
import useDialog from '@/lib/custom-hooks/UseDialog';
import useErrorApi from '@/lib/custom-hooks/UseErrorApi';
import { usePostUserLogoutMutation } from '@/api/user-auth';
import ModalConfirmation from '../modal-confirmation';

function RightNavbar() {
  const { isLoading, profile } = useProfile({});
  const { dialogProps, hideDialog, setDialogWarning } = useDialog();
  const { onErrorApi } = useErrorApi();

  const [postUserLogout] = usePostUserLogoutMutation();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const setLoadingFunction = (loading: boolean) => {
    dispatch(setLoading(loading));
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    handleCloseMenu();

    setDialogWarning({
      message: 'Apakah Anda yakin untuk Logout?',
      onCancel: hideDialog,
      onConfirm: () => {
        hideDialog();
        onLogout();
      },
    });
  };

  const onLogout = async () => {
    try {
      dispatch(setLoading(true));

      await postUserLogout().unwrap();
      await removeAuth();

      router.replace(pathname);
    } catch (error) {
      onErrorApi(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <Fragment>
      <ModalConfirmation {...dialogProps} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        {isLoading ? (
          <CircularProgress />
        ) : profile?.username ? (
          <Fragment>
            <Button
              ref={buttonRef}
              onClick={handleClick}
              variant="text"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: 'fit-content',
              }}>
              <Avatar
                src={
                  profile?.profilePictureUrl
                    ? profile?.profilePictureUrl.length > 0
                      ? profile?.profilePictureUrl
                      : exampleAvatar.src
                    : exampleAvatar.src
                }
                alt="avatar"
              />
              <Typography fontWeight={500} variant="body2">
                {profile?.username}
              </Typography>
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              MenuListProps={{
                sx: {
                  width: buttonRef.current
                    ? buttonRef.current.offsetWidth
                    : 'auto',
                },
              }}>
              <MenuItem onClick={handleCloseMenu}>
                <Link href={paths.dashboard} style={{ width: '100%' }}>
                  Dashboard
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClickLogout}>Logout</MenuItem>
            </Menu>
          </Fragment>
        ) : (
          <Link
            href={{ pathname: paths.login, query: { redirect_to: pathname } }}>
            <Button>Login</Button>
          </Link>
        )}
      </Box>
    </Fragment>
  );
}

export default RightNavbar;
