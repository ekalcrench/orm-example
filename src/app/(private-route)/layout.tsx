import { Fragment } from 'react';

import { Navbar } from '@/components';

export default function PrivateRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Fragment>
      <Navbar />

      {children}
    </Fragment>
  );
}
