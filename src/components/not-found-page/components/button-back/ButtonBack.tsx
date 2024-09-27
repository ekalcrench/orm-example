'use client';

import Button from '@mui/material/Button';
import { useRouter } from 'next/navigation';

import { ButtonBackProps } from './ButtonBack.types';

function ButtonBack({ redirectPath, text }: ButtonBackProps) {
  const router = useRouter();

  const handleClick = () => {
    if (redirectPath) {
      router.push(redirectPath);
      return;
    }

    router.back();
  };

  return <Button onClick={handleClick}>{text ?? 'Kembali'}</Button>;
}

export default ButtonBack;
