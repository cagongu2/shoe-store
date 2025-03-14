import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/home/Home";
import Contact from "../pages/contact/Contact";

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
        element: <div>GIỚI THIỆU</div>,
      },
      {
        path: "/san-pham",
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
        element: <div>BLOG</div>,
      },
      {
        path: "/lien-he",
        element: <Contact/>,
      },
    ],
  },
]);

export default router;
