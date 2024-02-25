import React from 'react'

import { Outlet } from 'react-router-dom';
import Login from './login/Login';
import NavLink from './NavLink';

const Root = () => {
  return (
    <div>
         <NavLink></NavLink>
        <Outlet></Outlet>
    </div>
  )
}

export default Root