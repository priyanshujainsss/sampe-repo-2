import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Setting from './pages/Setting';
import Enquiry from './pages/Enquiry';
import Forgot from './pages/Forgot';
// ----------------------------------------------------------------------

export default function Router() {
  const [isAuth, setisAuth] = useState(false);
  useEffect(() => {
    fetch('http://localhost:4000/auth', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          setisAuth(true);
          // getusers();
        } else setisAuth(false);
      })

      .catch((err) => console.log('error', err));
  }, []);

  const [allusers, setallusers] = useState([
    // {
    //   name: 'xyz',
    //   email: 'abc@123.com',
    //   phone: '789546321'
    // },
    // {
    //   name: 'xyz',
    //   email: 'abc@123.com',
    //   phone: '789546321'
    // },
    // {
    //   name: 'xyz',
    //   email: 'abc@123.com',
    //   phone: '789546321'
    // }
  ]);

  const [allenquiry, setallenquiry] = useState([
    {
      name: 'xyz',
      email: 'abc@123.com',
      phone: '789546321'
    },
    {
      name: 'xyz',
      email: 'abc@123.com',
      phone: '789546321'
    },
    {
      name: 'xyz',
      email: 'abc@123.com',
      phone: '789546321'
    }
  ]);
  // console.log(allusers);
  useEffect(async () => {
    const alluser = await axios.get('http://localhost:4000/getusers', {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    });
    await setallusers(alluser.data);
    // console.log(allusers);
  }, []);

  return useRoutes([
    {
      path: '/dashboard',
      element: isAuth ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/app" replace /> },
        { path: 'app', element: <DashboardApp /> },
        { path: 'user', element: <User allusers={allusers} /> },
        // { path: 'products', element: <Products /> },
        // { path: 'blog', element: <Blog /> },
        { path: 'setting', element: <Setting /> },
        { path: 'enquiry', element: <Enquiry allenquiry={allenquiry} /> }
      ]
    },
    {
      path: '/',
      element: !isAuth ? <LogoOnlyLayout /> : <Navigate to="/dashboard" />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'forgotpassword', element: <Forgot /> },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/dashboard" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
