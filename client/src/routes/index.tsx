import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/(auth)/Login";
import ForgotPassword from "../pages/(auth)/ForgotPassword";
import SignUp from "../pages/(auth)/SignUp";
import AdminPanel from "../pages/admin/AdminPanel";
import ProductListingPage from "../pages/products";
import ProductDetailPage from "../pages/products/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/sign-up",
        element: <SignUp />,
      },
      {
        path: "/admin-panel",
        element: <AdminPanel />,
      },
      {
        path: "/products",
        element: <ProductListingPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailPage />,
      },
    ],
  },
]);

export default router;
