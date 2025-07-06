import {createBrowserRouter} from "react-router-dom";
import MainLayout from '../Components/MainLayout'
import Home from '../Components/Home'
import Login from './../Components/Login';
import Register from "../Components/Register";
import PrivateRoute from './PrivateRoute'
import Orders from "../Components/Orders";
import Profile from './../Components/Profile';


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <h2>ERROR</h2>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/register',
        element: <Register></Register>
      },
      {
        path: '/orders',
        element: <PrivateRoute><Orders></Orders></PrivateRoute>
      },
      {
        path: '/profile',
        element: <PrivateRoute><Profile></Profile></PrivateRoute>
      }
    ]
  },
]);

export default router;


