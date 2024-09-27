import Box from '@mui/material/Box';
import dynamic from 'next/dynamic';
import Link from 'next/link';

import { CustomImage } from '@/components';
import { paths } from '@/constants';
import sibagiLogo from '@/static/svg/sibagi-logo.svg';
import './Navbar.scss';

const RightNavbar = dynamic(() => import('./RightNavbar'));

function Navbar() {
  return (
    <nav id="navbar" className="private-route-navbar">
      <RightNavbar />

      <Link href={paths.dashboard}>
        <Box className="sibagi-wrapper">
          <CustomImage
            src={sibagiLogo.src}
            alt="sibagi"
            sizes="(max-width: 600px) 100px, 110px"
            fill
            priority
            quality={100}
          />
        </Box>
      </Link>
    </nav>
  );
}

export default Navbar;
