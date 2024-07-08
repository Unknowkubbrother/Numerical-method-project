import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar/Navbar'

function Layout() {
  return (
    <React.Fragment>
        <Navbar />
        <Outlet />
        {/* <Footer /> */}
    </React.Fragment>
  )
}

export default Layout