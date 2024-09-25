'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';

import { CustomInput } from '@/components';
import useChangePassword from './ChangePassword.hooks';
import { FormContainer, ButtonWrapper } from './ChangePassword.styles';

function Password() {
  const {
    control,
    showConfirmationPassword,
    showNewPassword,
    showOldPassword,

    handleSave,
    setShowConfirmationPassword,
    setShowNewPassword,
    setShowOldPassword,
    trigger,
  } = useChangePassword();

  return (
    <Card sx={{ height: '100%' }}>
      <Typography variant="h5" fontWeight={500} sx={{ marginBottom: '2rem' }}>
        Password
      </Typography>

      <FormContainer>
        <Grid container columnSpacing={2} rowSpacing={0}>
          <Grid item xs={12}>
            <CustomInput
              textFieldProps={{
                type: showOldPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setShowOldPassword((prevState) => !prevState)
                        }>
                        {showOldPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              label="Password Lama"
              name="oldPassword"
              control={control}
              trigger={trigger}
              placeholder="Masukan password lama"
              renderErrorMessage
            />
          </Grid>
          <Grid item xs={12}>
            <CustomInput
              textFieldProps={{
                type: showNewPassword ? 'text' : 'password',
                InputProps: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={() =>
                          setShowNewPassword((prevState) => !prevState)
                        }>
                        {showNewPassword ? (
                          <VisibilityOff color="primary" />
                        ) : (
                          <Visibility color="primary" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
              label="Password Baru"
              name="newPassword"
              control={control}
              trigger={trigger}
              placeholder="Masukan password baru"
              renderErrorMessage
            />
          </Grid>
          <Grid item xs={12}>
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
              }}
              label="Konfirmasi Password Baru"
              name="confirmationPassword"
              control={control}
              trigger={trigger}
              placeholder="Konfirmasi password baru"
              renderErrorMessage
            />
          </Grid>
        </Grid>
      </FormContainer>

      <ButtonWrapper>
        <Button className="button" onClick={handleSave}>
          Simpan Perubahan
        </Button>
      </ButtonWrapper>
    </Card>
  );
}

export default Password;
