import React from 'react';
import { Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useForm } from 'react-hook-form';
import { signup } from '../redux/slices/auth';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../redux/store';

export function SignupPage() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm();
  const history = useHistory()
  const onSubmit = async (formData: { email: string, password: string, confirmPassword: string }) => {
    const { password, confirmPassword, email } = formData;
    if(password !== confirmPassword) return
    try {
      await dispatch(signup({
        email, 
        password
      })).unwrap();
      history.push('/profile')
    } catch(e) {
      console.log(e)
    }
  }
  const authData = useSelector(state => state.auth)
  const onError = (errors: any) => console.log(errors);
  if(authData.isLoading) return <p>Loading...</p>
  
  return (
    <Container>
      <div css={{ position: 'fixed', inset: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <Paper elevation={3} css={{ maxWidth: 500, padding: "50px 15px" }}>
          <Typography component="h1">SIGN UP</Typography>
          <form onSubmit={handleSubmit(onSubmit, onError)}>
            <TextField
              css={{ marginTop: 10 }}
              fullWidth
              variant="outlined"
              label="email"
              inputProps={register("email", { required: true })}
            />
            <TextField
              css={{ marginTop: 10 }}
              fullWidth
              label="password"
              type="password"
              inputProps={register("password", { required: true })}
            />
            <TextField
              css={{ marginTop: 10 }}
              fullWidth
              type="password"
              label="confirm password"
              inputProps={register("confirmPassword", { required: true })}
            />
            <Button fullWidth type="submit" variant="contained" css={{ marginTop: 10, minWidth: 300  }}>
              SIGN UP
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  )
}