'use client';

import { Fragment, ReactNode, useEffect, useRef, useState } from 'react';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useMediaQuery } from 'react-responsive';

import { CustomImage, Footer } from '@/components';
import { paths } from '@/constants';
import arrowDown from '@/static/svg/arrow-down.svg';
import checkmark from '@/static/svg/checkmark.svg';
import { SpaceBetweenBox } from '@/styles';
import {
  MenuButton,
  ProfileCard,
  ProfileContainer,
} from './AccountLayout.styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import ArrowDown from '@/static/svg/arrowDown';

export default function AccountLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  router.prefetch(paths.account);
  router.prefetch(paths.changePassword);
  router.prefetch(paths.connectedDevice);

  const isMobile = useMediaQuery({ maxWidth: 600 });
  const buttonRef = useRef<HTMLDivElement>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState<{
    description: string;
    url: string;
  }>({
    description: 'Informasi Pengguna',
    url: paths.account,
  });

  const open = Boolean(anchorEl);
  const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (url: string) => {
    router.replace(url);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (selectedMenu.url === pathname) return;

    if (pathname === paths.account) {
      setSelectedMenu({
        description: 'Informasi Pengguna',
        url: paths.account,
      });
    } else if (pathname.includes(paths.changePassword)) {
      setSelectedMenu({
        description: 'Ganti Password',
        url: paths.changePassword,
      });
    } else if (pathname.includes(paths.connectedDevice)) {
      setSelectedMenu({
        description: 'Perangkat Terhubung',
        url: paths.connectedDevice,
      });
    }
  }, [pathname]);

  if (pathname.includes('request-account-deletion')) {
    return children;
  }

  return (
    <Fragment>
      <ProfileContainer>
        <ProfileCard>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={5}>
              {isMobile ? (
                <Grid item xs={12}>
                  <List
                    ref={buttonRef}
                    component="div"
                    aria-label="Device settings"
                    sx={{
                      bgcolor: 'background.paper',
                      padding: 0,
                      borderRadius: '8px',
                      borderWidth: '1px',
                      borderStyle: 'solid',
                      borderColor: 'card.borderColor',
                    }}>
                    <ListItemButton
                      onClick={handleClickListItem}
                      sx={{ padding: '20px' }}>
                      <SpaceBetweenBox sx={{ width: '100%' }}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: 'regalBlue.main' }}>
                            {selectedMenu.description}
                          </Typography>
                        </Box>

                        <ArrowDown height={20} width={20} fill="#1D405C" />
                      </SpaceBetweenBox>
                    </ListItemButton>
                  </List>

                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      sx: {
                        width: buttonRef.current
                          ? buttonRef.current.offsetWidth
                          : 'auto',
                      },
                    }}>
                    <MenuItem
                      onClick={() => handleMenuItemClick(paths.account)}>
                      <SpaceBetweenBox sx={{ width: '100%' }}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: 'regalBlue.main' }}>
                            Informasi User
                          </Typography>
                        </Box>
                        {pathname === paths.account && (
                          <Box>
                            <CustomImage
                              src={checkmark.src}
                              alt="checkmark"
                              width={24}
                              height={24}
                            />
                          </Box>
                        )}
                      </SpaceBetweenBox>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() => handleMenuItemClick(paths.changePassword)}>
                      <SpaceBetweenBox sx={{ width: '100%' }}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: 'regalBlue.main' }}>
                            Ganti Password
                          </Typography>
                        </Box>
                        {pathname.includes(paths.changePassword) && (
                          <Box>
                            <CustomImage
                              src={checkmark.src}
                              alt="checkmark"
                              width={24}
                              height={24}
                            />
                          </Box>
                        )}
                      </SpaceBetweenBox>
                    </MenuItem>
                    <Divider />
                    <MenuItem
                      onClick={() =>
                        handleMenuItemClick(paths.connectedDevice)
                      }>
                      <SpaceBetweenBox sx={{ width: '100%' }}>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{ color: 'regalBlue.main' }}>
                            Perangkat Terhubung
                          </Typography>
                        </Box>
                        {pathname.includes(paths.connectedDevice) && (
                          <Box>
                            <CustomImage
                              src={checkmark.src}
                              alt="checkmark"
                              width={24}
                              height={24}
                            />
                          </Box>
                        )}
                      </SpaceBetweenBox>
                    </MenuItem>
                  </Menu>
                </Grid>
              ) : (
                <Card sx={{ height: '100%', boxSizing: 'border-box' }}>
                  <Typography
                    variant="h5"
                    fontWeight={500}
                    sx={{ marginBottom: '2rem' }}>
                    Akun
                  </Typography>

                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '20px',
                    }}>
                    <Link href={paths.account} replace prefetch>
                      <MenuButton
                        variant="text"
                        color={
                          selectedMenu.url === paths.account
                            ? 'primary'
                            : 'regalBlue'
                        }>
                        Informasi Pengguna
                        <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
                      </MenuButton>
                    </Link>

                    <Divider />

                    <Link href={paths.changePassword} replace prefetch>
                      <MenuButton
                        variant="text"
                        color={
                          selectedMenu.url === paths.changePassword
                            ? 'primary'
                            : 'regalBlue'
                        }>
                        Ganti Password
                        <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
                      </MenuButton>
                    </Link>

                    <Divider />

                    <Link href={paths.connectedDevice} replace prefetch>
                      <MenuButton
                        variant="text"
                        color={
                          selectedMenu.url === paths.connectedDevice
                            ? 'primary'
                            : 'regalBlue'
                        }>
                        Perangkat Terhubung
                        <ArrowForwardIosIcon sx={{ fontSize: '18px' }} />
                      </MenuButton>
                    </Link>
                  </Box>
                </Card>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={7}>
              {children}
            </Grid>
          </Grid>
        </ProfileCard>
      </ProfileContainer>

      <Footer backgroundColor="common.white" />
    </Fragment>
  );
}
