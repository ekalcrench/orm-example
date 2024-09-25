import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { CustomImage } from '@/components';
import { paths } from '@/constants';
import dollarSquare from '@/static/svg/dollar-square.svg';
import happyEmoji from '@/static/svg/happy-emoji.svg';
import volumeHigh from '@/static/svg/volume-high.svg';
import { GridWrapper } from './components';
import './Dashboard.scss';

export default function Dashboard() {
  return (
    <Box component={'section'} className="dashboard-container">
      <Box className="list-card-container">
        <GridWrapper>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className="logo-wrapper" sx={{ marginRight: '16px' }}>
                  <CustomImage src={volumeHigh.src} alt="volume" fill />
                </Box>
                <Typography
                  // className="title"
                  fontSize={'1.75rem'}
                  fontWeight={500}>
                  Gift (Streaming)
                </Typography>
              </Box>
              <Typography className="body" fontWeight={300}>
                Atur Settingan Gift dan Overlay Streaming lainnya di sini.
                Kompatibel dengan OBS dan Streamlabs.
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <Link href={paths.page} className="link">
                  <Button className="button" variant="outlined">
                    Atur Gift dan Overlay
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className="logo-wrapper" sx={{ marginRight: '16px' }}>
                  <CustomImage src={dollarSquare.src} alt="dollar" fill />
                </Box>
                <Typography fontSize={'1.75rem'} fontWeight={500}>
                  Keuangan
                </Typography>
              </Box>
              <Typography className="body" fontWeight={300}>
                Lihat histori transaksi masuk dan keluar serta penarikan saldo
                masuk Anda di sini.
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <Link href={paths.transactions} className="link">
                  <Button className="button" variant="outlined">
                    Lihat Keuangan
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box className="logo-wrapper" sx={{ marginRight: '16px' }}>
                  <CustomImage src={happyEmoji.src} alt="happy" fill />
                </Box>
                <Typography fontSize={'1.75rem'} fontWeight={500}>
                  Q&Me
                </Typography>
              </Box>
              <Typography className="body" fontWeight={300}>
                (Questioning Me), Yuk ajak fans atau teman kamu untuk bertanya
                sesukanya.
              </Typography>
              <Box sx={{ flex: 1, display: 'flex', alignItems: 'flex-end' }}>
                <Link href={paths.qme} className="link">
                  <Button className="button" variant="outlined">
                    Mulai Sekarang
                  </Button>
                </Link>
              </Box>
            </Card>
          </Grid>
        </GridWrapper>
      </Box>
    </Box>
  );
}
