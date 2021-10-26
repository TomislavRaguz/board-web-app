import React, { Component } from 'react';
import { ResponsiveNavbar } from './ResponsiveNavbar'
import { DesktopNav } from "./DesktopNav"
import { MobileNav } from "./MobileNav"

export interface NavProps {
  //user: any
}
export const DESKTOP_NAV_HEIGHT = 80
export const MOBILE_NAV_HEIGHT = 80
export const NAV_HEIGHT = { xs: MOBILE_NAV_HEIGHT, md: DESKTOP_NAV_HEIGHT }

export const NavbarRaw = (props: NavProps) => {
  return (
    <ResponsiveNavbar
      {...props}
      height={DESKTOP_NAV_HEIGHT}
      mobileHeight={MOBILE_NAV_HEIGHT}
      renderDesktopNav={(props: NavProps) => <DesktopNav {...props} />}
      renderMobileNav={(props: NavProps) => <MobileNav {...props} />}
    />
  )
}
export const Navbar = React.memo(NavbarRaw)