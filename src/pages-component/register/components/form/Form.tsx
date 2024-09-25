'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { CustomCheckbox, CustomInput } from '@/components';
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
          label="Email"
          name="email"
          control={control}
          trigger={trigger}
          placeholder="Masukan email"
          renderErrorMessage
        />
      </Box>

      <Box sx={{ marginBottom: '1rem' }}>
        <CustomInput
          label="Nama"
          name="name"
          control={control}
          trigger={trigger}
          placeholder="Masukan nama"
          renderErrorMessage
        />
      </Box>

      <Box sx={{ marginBottom: '1rem' }}>
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

      <Box sx={{ marginBottom: '1rem' }}>
        <CustomCheckbox
          controllerProps={{ control, name: 'isMoreThan17' }}
          checkboxLabel="Berusia 17 tahun ke atas"
        />
      </Box>

      <Box>
        <Typography
          textAlign={'justify'}
          sx={{ typography: { sm: 'body1', xs: 'body2' } }}>
          Melanggar syarat dan ketentuan dapat menyebabkan akun Anda untuk
          dinonaktifkan (ban) secara sepihak oleh sibagi.
        </Typography>
      </Box>

      <Box sx={{ marginTop: '2.5rem' }}>
        <Button sx={{ width: '100%' }} onClick={handleSubmit}>
          Daftar
        </Button>
      </Box>

      <BoxFlexEnd sx={{ marginTop: '1rem' }}>
        <Link href={paths.login}>
          <Button sx={{ color: 'input.placeholder' }} variant="text">
            Sudah punya akun?
          </Button>
        </Link>
      </BoxFlexEnd>
    </Box>
  );
}

export default Form;
