import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";
import Blog from "../pages/blog/Blog";
import About from "../pages/about/About";
import Product from "../pages/product/Product";

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
        element: <Product/>,
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
        path: "/lien-he",
        element: <Contact/>,
      },
    ],
  },
]);

export default router;
