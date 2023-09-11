import "./index.css";
import React from "react";
import Home from "./components/Home";
import About from "./pages/about/About";
import ReactDOM from "react-dom/client";
import { SignIn } from "./pages/auth/SignIn";
import Contact from "./pages/contact/Contact";
import Roadmap from "./pages/roadmap/Roadmap";
import Building from "./pages/building/Building";
import { ThemeProvider } from "@material-tailwind/react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
    children: [
      
      {
        path: "/roadmap",
        element: <Roadmap />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
    ],
  },
  {
    path: "*",
    element: <Building />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router}>
        <Outlet />
      </RouterProvider>
    </ThemeProvider>
  </React.StrictMode>
);
