'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { CustomImage } from '@/components';
import { paths } from '@/constants';
import dollarSquare from '@/static/svg/dollar-square.svg';
import happyEmoji from '@/static/svg/happy-emoji.svg';
import volumeHigh from '@/static/svg/volume-high.svg';
import './Dashboard.scss';
import useDashboard from './Dashboard.hooks';

export default function Dashboard() {
  const {} = useDashboard();

  return (
    <Box component={'section'} className="dashboard-container">
      <Box className="list-card-container">
        <Grid size={{ xs: 6, sm: 4, md: 3 }}>
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
              <Button className="button" variant="outlined">
                Atur Gift dan Overlay
              </Button>
            </Box>
          </Card>
        </Grid>
      </Box>
    </Box>
  );
}
