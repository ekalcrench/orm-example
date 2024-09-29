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

import { authApi, paths } from '@/constants';
import useProfile from '@/lib/custom-hooks/UseProfile';
import { setLoading } from '@/lib/features/loader/Loader.slice';
import { useAppDispatch, useAppSelector } from '@/lib/Hooks';
import exampleAvatar from '@/static/img/example-avatar.png';
import { Avatar } from './Navbar.styles';
import useDialog from '@/lib/custom-hooks/UseDialog';
import useErrorApi from '@/lib/custom-hooks/UseErrorApi';
import { fetchWithAuth } from '@/utils';

function RightNavbar() {
  const { isLoadingGetData, profile } = useProfile();
  const { onErrorApi } = useErrorApi();

  const buttonRef = useRef<HTMLButtonElement>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const dispatch = useAppDispatch();

  const router = useRouter();
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickLogout = () => {
    handleCloseMenu();
    onLogout();
  };

  const onLogout = async () => {
    dispatch(setLoading(true));

    const res = await fetchWithAuth(authApi.logout, { method: 'POST' });

    if (res.ok) {
      const { data } = await res.json(); // Parse response data if it's JSON
      console.log('Success:', data); // e.g., { message: "Login successful", token: "abc123" }
      router.replace(paths.login);
    } else {
      // Handle errors, you can also access the error response body
      const errorData = await res.json();
      console.error('Error:', errorData); // e.g., { error: "Invalid credentials" }
      onErrorApi(errorData.message, res.status);
    }

    dispatch(setLoading(false));
  };

  return (
    <Fragment>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          flex: 1,
        }}>
        {isLoadingGetData ? (
          <CircularProgress />
        ) : profile?.name ? (
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
                  profile?.profilePicture
                    ? profile?.profilePicture.length > 0
                      ? profile?.profilePicture
                      : exampleAvatar.src
                    : exampleAvatar.src
                }
                alt="avatar"
              />
              <Typography fontWeight={500} variant="body2">
                {profile?.name}
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
                <Link href={paths.account} style={{ width: '100%' }}>
                  Account
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
