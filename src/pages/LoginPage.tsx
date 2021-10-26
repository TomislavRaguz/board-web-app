import React from 'react';
import { useForm } from "react-hook-form";
import { Button, Container, Paper, TextField, Typography } from '@mui/material';
import { login } from '../redux/slices/auth';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../redux/store';

export function LoginPage() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit } = useForm();
  const history = useHistory()
  const onSubmit = async (data: { email: string, password: string }) => {
    try {
      const res = await dispatch(login(data)).unwrap();
      console.log(res)
      history.push('/profile')
    } catch(e) {
      console.log(e)
    }
  }
  const onError = (errors: any) => console.log(errors);
  return (
    <Container>
      <div css={{ position: 'fixed', inset: 0, top: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <Paper elevation={3} css={{ maxWidth: 500, padding: "50px 15px" }}>
          <Typography component="h1">LOGIN</Typography>
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
            <Button fullWidth type="submit" variant="contained" css={{ marginTop: 10, minWidth: 300  }}>
              login
            </Button>
          </form>
        </Paper>
      </div>
    </Container>
  )
}
