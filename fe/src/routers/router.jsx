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

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/ve-chung-toi",
        element: <About/>,
      },
      {
        path: "/san-pham",
        element: <div>SẢN PHẨM</div>,
      },
      {
        path: "/san-pham/:id",
        element: <div>SẢN PHẨM</div>,
      },
      {
        path: "/",
        element: <div>THƯƠNG HIỆU</div>,
      },
      {
        path: "/",
        element: <div>PHỤ KIỆN</div>,
      },
      {
        path: "/bai-viet",
        element: <Blog/>,
      },
      {
        path: "/bai-viet/:id",
        element: <BlogDetail/>,
      },
      {
        path: "/gio-hang",
        element: <Cart/>,
      },
      {
        path: "/lien-he",
        element: <Contact/>,
      },
      {
        path: "/san-pham-yeu-thich",
        element: <FavoritePage/>,
      },
    ],
  },
]);

export default router;
