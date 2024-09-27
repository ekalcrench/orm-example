'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from 'next/link';

import { CustomInput } from '@/components';
import { paths } from '@/constants';
import { BoxFlexEnd } from '@/styles';
import useCustomForm from './Form.hooks';

function Form() {
  const {
    // State
    inputFormMethod: { control, trigger },
    showPassword,

    // Function
    handleSubmit,
    setShowPassword,
  } = useCustomForm();

  return (
    <Box>
      <Box sx={{ marginBottom: '1rem' }}>
        <CustomInput
          textFieldProps={{
            onKeyDown: (e) => {
              if (e.key === 'Enter') handleSubmit();
            },
          }}
          label="Email"
          name="email"
          control={control}
          trigger={trigger}
          placeholder="Masukan email"
          renderErrorMessage
        />
      </Box>

      <Box>
        <CustomInput
          textFieldProps={{
            type: showPassword ? 'text' : 'password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prevState) => !prevState)}>
                    {showPassword ? (
                      <VisibilityOff color="primary" />
                    ) : (
                      <Visibility color="primary" />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
            onKeyDown: (e) => {
              if (e.key === 'Enter') handleSubmit();
            },
          }}
          label="Password"
          name="password"
          control={control}
          trigger={trigger}
          placeholder="Masukan password"
          renderErrorMessage
        />
      </Box>

      <Box sx={{ marginTop: '2.5rem' }}>
        <Button sx={{ width: '100%' }} onClick={handleSubmit}>
          Log In
        </Button>
      </Box>

      <BoxFlexEnd sx={{ marginTop: '1rem' }}>
        <Link href={paths.register}>
          <Button sx={{ color: 'input.placeholder' }} variant="text">
            Daftar akun baru
          </Button>
        </Link>
      </BoxFlexEnd>
    </Box>
  );
}

export default Form;
