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
import SingleProduct from "../pages/product/details/SingleProduct";
import Login from "../components/Login";
import AdminLogin from "../components/AdminLogin";

import Register from "../components/Register";
import CheckoutPage from "../pages/product/checkoutPage";
import { PrivateRoute } from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import DashBoard from "../pages/dashboard/DashBoard";

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
    element: <DashBoard />,
  },
]);

export default router;
