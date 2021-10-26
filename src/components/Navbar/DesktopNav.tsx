import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Box, Button, Container } from '@mui/material';
import { NavProps } from './';
import { useSelector } from 'react-redux';

export function DesktopNav(props: NavProps) {
  const authState = useSelector(state => state.auth);
  return (
    <div css={{ borderBottom: '1px solid lightgray', height: '100%' }}>
      <Container sx={{ height: '100%' }}>
        <div
          css={{
            display: 'flex', 
            flex: 1, 
            height: '100%',
            backgroundColor: 'white'
          }}
        >
          <div>
            <NavLink to='/'>
            LOGO
            </NavLink>
          </div>
            <div css={{ 
              marginLeft: 'auto', 
              display: "flex",
              height: "100%",
              justifyContent: "center",
              alignItems: "center"
            }}>
              {authState.user ? (
                <NavLink
                  css={{ marginRight: '10px' }}
                  to='/profile'
                  activeClassName='active-link'
                >
                  <Button variant="outlined">Profile</Button>
                </NavLink>
              ): (
                <>
                  <NavLink
                    css={{ marginRight: '10px' }}
                    to='/login'
                    activeClassName='active-link'
                  >
                    <Button variant="outlined">Login</Button>
                  </NavLink>
                  <NavLink 
                    to='/signup'
                    activeClassName='active-link'
                  >
                    <Button variant="contained">Sign up now</Button>
                  </NavLink>
                </>
              )}
          </div>
        </div>
      </Container>
    </div>
    
    
  )
}