import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/(auth)/Login";
import ForgotPassword from "../pages/(auth)/ForgotPassword";
import SignUp from "../pages/(auth)/SignUp";
import AdminPanel from "../pages/admin/AdminPanel";
import ProductListingPage from "../pages/products";
import ProductDetailPage from "../pages/products/[id]";
import Dashboard from "../pages/admin/Dashboard";
import UserManagement from "../pages/admin/User";
import CategoryManagement from "../pages/admin/Category";
import ProductManagement from "../pages/admin/Product";
import BlogManagement from "../pages/admin/Blog";
import OrderManagement from "../pages/admin/Order";

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
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          {
            path: "users",
            element: <UserManagement />,
          },
          {
            path: "categories",
            element: <CategoryManagement />,
          },
          {
            path: "products",
            element: <ProductManagement />,
          },
          {
            path: "blogs",
            element: <BlogManagement />,
          },
          {
            path: "orders",
            element: <OrderManagement />,
          },
          {
            path: "settings",
            element: <div>Settings content here</div>,
          },
        ],
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
