import React from 'react'
import { Outlet } from 'react-router-dom';
import CommonHeader from '../CommonHeader/CommonHeader'

const Layout = () => {
  return (
    <main>
        <CommonHeader/>
        <Outlet/>
    </main>
  )
}

export default Layout