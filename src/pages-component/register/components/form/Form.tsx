'use client';

import { Visibility, VisibilityOff } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
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
    showConfirmationPassword,
    showPassword,

    // Function
    handleSubmit,
    setShowConfirmationPassword,
    setShowPassword,
  } = useCustomForm();

  return (
    <Grid container spacing={1}>
      <Grid size={{ xs: 12 }}>
        <CustomInput
          label="Email"
          name="email"
          control={control}
          trigger={trigger}
          placeholder="Masukan email"
          renderErrorMessage
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomInput
          label="Nama"
          name="name"
          control={control}
          trigger={trigger}
          placeholder="Masukan nama"
          renderErrorMessage
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
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
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomInput
          textFieldProps={{
            type: showConfirmationPassword ? 'text' : 'password',
            InputProps: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() =>
                      setShowConfirmationPassword((prevState) => !prevState)
                    }>
                    {showConfirmationPassword ? (
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
          label="Konfirmasi Password"
          name="confirmationPassword"
          control={control}
          trigger={trigger}
          placeholder="Masukan password"
          renderErrorMessage
        />
      </Grid>
      <Grid size={{ xs: 12 }}>
        <CustomCheckbox
          controllerProps={{ control, name: 'isMoreThan17' }}
          checkboxLabel="Berusia 17 tahun ke atas"
        />
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
        <Typography
          textAlign={'justify'}
          sx={{ typography: { sm: 'body1', xs: 'body2' } }}>
          Melanggar syarat dan ketentuan dapat menyebabkan akun Anda untuk
          dinonaktifkan (ban) secara sepihak oleh sibagi.
        </Typography>
      </Grid>

      <Grid size={{ xs: 12 }} sx={{ marginTop: '2rem' }}>
        <Box>
          <Button sx={{ width: '100%' }} onClick={handleSubmit}>
            Daftar
          </Button>
          <BoxFlexEnd sx={{ marginTop: '0.5rem' }}>
            <Link href={paths.login}>
              <Button sx={{ color: 'input.placeholder' }} variant="text">
                Sudah punya akun?
              </Button>
            </Link>
          </BoxFlexEnd>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Form;
