import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import './App.css'
import Navbar from "./component/navbar/Navbar";
import Home from "./page/home/Home";
import Login from "./page/login/Login";
import SignUp from "./page/signup/SignUp";
import { useEffect, useState } from "react";
import { callAccount } from "./services/api";
import { useDispatch, useSelector } from "react-redux";
import { doGetAccount } from "./redux/author/authSlice";
import Loading from "./component/loading/Loading";
import NotFound from "./component/notfound/NotFound";
import IsAuthAdmin from "./page/admin/isAuthAdmin";
import Admin from "./page/admin/Admin";
import Profile from "./component/profile/Profile";
import Users from "./component/adminLayout/users/Users";
import Books from "./component/adminLayout/books/Books";
import Orders from "./component/adminLayout/orders/Orders";
import AdminContent from "./component/adminLayout/adminContent/AdminContent";

function App() {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(false);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
  const getAccount = async () => {
    const res = await callAccount();
    // console.log(res)
    if (res.statusCode === 200) {
      dispatch(doGetAccount(res.data.user))
      setProfile(true)
    }
  }
  useEffect(() => {
    getAccount()
  }, [])
  const Layout = () => {
    return (
      <div className='main'>
        <Navbar profile={profile} setProfile={setProfile} />
        <div className='container'>
          <Outlet></Outlet>
        </div>
        {/* <Footer /> */}
      </div>
    )
  }



  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        {
          path: 'home',
          element: <Home />
        },
        {
          path: 'login',
          element: <Login setProfile={setProfile} />
        },
        {
          path: 'signup',
          element: <SignUp />
        },
        {
          path: 'profile',
          element: <Profile />
        }

      ]

    },
    {
      path: '/admin',
      element: <IsAuthAdmin>
        <Admin />
      </IsAuthAdmin>,
      children: [
        {
          path: '',
          element: <AdminContent />
        },
        {
          path: 'users',
          element: <Users />
        },
        {
          path: 'books',
          element: <Books />
        },
        {
          path: 'orders',
          element: <Orders />
        }
      ]
    }
  ])

  const IsAuth = () => {
    if (!isAuthenticated) {
      return <Loading />
    } else {

      return <RouterProvider router={router} />
    }
  }
  return (
    <RouterProvider router={router} />
    // <Loading />
    // <IsAuth />

  )
}

export default App
