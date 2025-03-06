import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.jsx";
import router from "./routers/router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
   <RouterProvider router={router}/>
  </StrictMode>
);
