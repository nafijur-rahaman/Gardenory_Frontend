import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import HomePage from "../Pages/HomePage/HomePage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import PrivateRoute from "../Provider/PrivateRoute";
import ExGarden from "../Pages/ExGarden/ExGarden";
import ShGarden from "../Pages/ShGarden/ShGarden";
import Mytips from "../Pages/Mytips/Mytips";
import BrowseTips from "../Pages/BrowseTips/BrowseTips";
import TipDetails from "../Pages/TipDetails/TipDetails";
import UpdateTip from "../Pages/UpdateTip/UpdateTip";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Loading from "../Components/Loader/Loader";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    errorElement: <ErrorPage></ErrorPage>,
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
        element: (
          <PrivateRoute>
            <ExGarden></ExGarden>
          </PrivateRoute>
        ),
      },
      {
        path: "/browse-tips",
        element: <BrowseTips></BrowseTips>,
      },
      {
        path: "/tip-details/:id",
        element: (
          <PrivateRoute>
            <TipDetails></TipDetails>
          </PrivateRoute>
        ),
        loader: ({params})=> fetch(`http://localhost:3000/tips/${params.id}`),
        hydrateFallbackElement: <Loading></Loading>,
      },
      {
        path: "/update-tip/:id",
        element: (
          <PrivateRoute>
            <UpdateTip />
          </PrivateRoute>
        ),
        loader: async ({ params }) => {
          const res = await fetch(`http://localhost:3000/tips/${params.id}`);
          const data = await res.json();
          return data.data;
        },
      },
      {
        path: "/sh-garden-tips",
        element: (
          <PrivateRoute>
            <ShGarden></ShGarden>
          </PrivateRoute>
        ),
      },
      {
        path: "/my-tips",
        element: (
          <PrivateRoute>
            <Mytips></Mytips>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
