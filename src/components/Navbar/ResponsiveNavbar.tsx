import React from 'react';
import { Box } from "@mui/material";

export const ResponsiveNavbar = (props : {
  mobileHeight: number
  height: number
  renderDesktopNav: (navProps: any) => JSX.Element
  renderMobileNav: (navProps: any) => JSX.Element
}) => {
  const { renderDesktopNav, renderMobileNav, mobileHeight, height, ...navProps } = props;
  return (
    <>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <nav
          style={{ 
            position: 'fixed', 
            width: '100%',
            height,
            zIndex: 1000
            //backgroundColor: pathname === '/' ? 'rgba(0,0,0,0.3)' : 'white',
            //borderBottom: pathname === '/' ? 'none' : '1px solid lightgray'
          }}
        >
          {renderDesktopNav(navProps)}
        </nav>
        <div style={{ height }} />
      </Box>

      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <nav
          style={{ 
            position: 'fixed', 
            width: '100%',
            height: mobileHeight,
            zIndex: 1000
            //backgroundColor: pathname === '/' ? 'rgba(0,0,0,0.3)' : 'white',
            //borderBottom: pathname === '/' ? 'none' : '1px solid lightgray'
          }}
        >
          {renderMobileNav(navProps)}
        </nav>
        <div style={{ height: mobileHeight }} />
      </Box>
    </>
  )
}
