import React from 'react';
import { Button, Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { useAppDispatch } from '../redux/store';
import { logout } from '../redux/slices/auth';

export function ProfilePage() {
  const dispatch = useAppDispatch()
  const { isLoading, user } = useSelector(state => state.auth);
  if(isLoading) return <p>Loading...</p>
  if(!user) return <Redirect to='/login' />
  const onClick = () => {
    dispatch(logout())
  }
  return (
    <Container>
      <p>email: {user.email}</p>
      <Button
        variant="contained"
        onClick={onClick}>
          Logout
      </Button>
    </Container>
  )
}