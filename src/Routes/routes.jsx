import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import ExGarden from "../Pages/ExGarden/ExGarden";
import ShGarden from "../Pages/ShGarden/ShGarden";
import Mytips from "../Pages/Mytips/Mytips";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: HomePage,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/ex-gardeners",
        element: <PrivateRoute>
          <ExGarden></ExGarden>
        </PrivateRoute>
      },
      {
        path: "/sh-garden-tips",
        element: <PrivateRoute>
          <ShGarden></ShGarden>
        </PrivateRoute>
      },
      {
        path: "/my-tips",
        element: <PrivateRoute>
         <Mytips></Mytips>
        </PrivateRoute>
      }
    ],
  },
]);
