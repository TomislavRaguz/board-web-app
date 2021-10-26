import React from 'react';
import { Container } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { IUser } from '../redux/slices/api'

export function HomePage() {
  const { user } = useSelector(state => state.auth)
  return user ? <LoggedInHomePage user={user}/> : <NoUserHomePage />  
}

function LoggedInHomePage(props: { user: IUser }) {
  return (
    <Container>
      <p>Home</p>
      <p>email: {props.user.email}</p>
      <Link to='/boards/new'>
        <p>New board</p>
      </Link>
      <Link to='/boards'>
        <p>Public boards</p>
      </Link>
      <p>My boards</p>
      <p>My columns</p>
    </Container>
  )
}

function NoUserHomePage () {
  return (
    <Container>
      <p>Home</p>
      <p>Not logged in</p>
    </Container>
  )
}