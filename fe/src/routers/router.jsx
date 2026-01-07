import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import Blog from "../pages/blog/Blog";
import About from "../pages/about/About";
import FavoritePage from "../pages/favorite/FavoritePage";
import BlogDetail from "../pages/blog/details/BlogDetail";
import Cart from "../pages/cart/Cart";
import Product from "../pages/product/Product";
import CheckoutPage from "../pages/product/CheckoutPage"
import SingleProduct from "../pages/product/details/SingleProduct";
import Login from "../components/Login";
import AdminLogin from "../components/AdminLogin";

import Register from "../components/Register";
import { PrivateRoute } from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashBoard from "../pages/dashboard/DashBoard";
import Profile from "../pages/profile/Profile";
import OrderHistory from "../pages/orders/OrderHistory";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ve-chung-toi",
        element: <About />,
      },
      {
        path: "/san-pham",
        element: <Product />,
      },
      {
        path: "/san-pham/:id",
        element: <SingleProduct />,
      },
      {
        path: "/bai-viet",
        element: <Blog />,
      },
      {
        path: "/bai-viet/:id",
        element: <BlogDetail />,
      },
      {
        path: "/gio-hang",
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/lien-he",
        element: <Contact />,
      },
      {
        path: "/san-pham-yeu-thich",
        element: <FavoritePage />,
      },
      {
        path: "/dang-nhap",
        element: <Login />,
      },
      {
        path: "/dang-ky",
        element: <Register />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        )
      },
      {
        path: "/orders",
        element: (
          <PrivateRoute>
            <OrderHistory />
          </PrivateRoute>
        )
      },
      {
        path: "/thanh-toan",
        element: (
          <PrivateRoute>
            <CheckoutPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <AdminRoute>
        <DashBoard />
      </AdminRoute>
    ),
  },
  {
    path: "/admin",
    element: <AdminLogin />,
  },
]);

export default router;
