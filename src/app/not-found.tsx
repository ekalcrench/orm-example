import { NotFoundPage as NotFoundComponent } from '@/components';

function NotFoundPage() {
  return (
    <NotFoundComponent
      message="Halaman tidak ditemukan, kembali ke halaman sebelumnya"
      showButton
    />
  );
}

export default NotFoundPage;
