import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order/Order";
import LogIn from "../pages/LogIn/LogIn";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secrets from "../pages/Shared/Secrets/Secrets";
import Dashboard from "../Layout/Dashboard";
import Cart from "../pages/Dashboard/Cart/Cart";
import Allusers from "../pages/Dashboard/Allusers/Allusers";
import AddItems from "../pages/Dashboard/AddItems/AddItems";
import AdminRoute from "./AdminRoute";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import UpdateItems from "../pages/Dashboard/UpdateItems/UpdateItems";
import UserHome from "../pages/Dashboard/UserHome/UserHome";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";


export const router=createBrowserRouter([
    {
        path:"/",
        element:<Main></Main>,
        children:[
            {
                path:"/",
                element:<Home></Home>
            },
            {
                path:"menu",
                element:<Menu></Menu>
            },
            {
                path:"order/:category",
                element:<Order></Order>
            },
            {
                path:"logIn",
                element:<LogIn></LogIn>
            },
            {
                path:"register",
                element:<SignUp></SignUp>
            },
            {
                path:"secrets",
                element:<PrivateRoute><Secrets></Secrets></PrivateRoute>
            }
        ]
    },
    {
        path: 'dashboard',
        element:<PrivateRoute><Dashboard></Dashboard></PrivateRoute> ,
        children: [
          {
            path:'userHome',
            element:<UserHome></UserHome>
          },
          {
            path: 'cart',
            element: <Cart></Cart>
          },
        //   admin route
        {
          path:'adminHome',
          element:<AdminRoute><AdminHome></AdminHome></AdminRoute>
        },
          {
            path:'users',
            element:<AdminRoute><Allusers></Allusers></AdminRoute> 
          },
          {
            path:'addItems',
            element:<AdminRoute><AddItems></AddItems></AdminRoute>
          },
          {
            path:'manageItems',
            element:<AdminRoute><ManageItems></ManageItems></AdminRoute>
          },
          {
            path:'updateItem/:id',
            element:<AdminRoute><UpdateItems></UpdateItems></AdminRoute>,
            loader:({params})=>fetch(`https://bistro-boss-server-nine-eta.vercel.app/menu/${params.id}`)
          },
          {

          }
          
        ]
      }

])