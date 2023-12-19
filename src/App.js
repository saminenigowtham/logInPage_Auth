import React from 'react'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
// importing the components
import UserName from './components/Username'
import Password from './components/Password'
import Reset from './components/Reset'
import Register from './components/Register'
import PageNotFound from './components/PageNotFound'
import Profile from './components/Profile'
import Recover from './components/Recover'

import {AuthorizeUser} from './middleware/auth'
import {ProtectRoute} from './middleware/auth'
// creating the routers
const router =createBrowserRouter([
    {
        path : "/",
        element :<UserName></UserName>
    },
    {
        path : "/register",
        element : <Register></Register>
    },
    {
        path : '/password',
        element :<ProtectRoute><Password></Password></ProtectRoute>
    },
    {
        path : '/profile',
        element :<AuthorizeUser><Profile></Profile></AuthorizeUser>
    },
    {
        path : '/reset',
        element :<Reset></Reset>
    },
    {
        path : '/recover',
        element :<Recover></Recover>
    },
    {
        path : '*',
        element : <PageNotFound></PageNotFound>
    },
])
export default function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  )
}
