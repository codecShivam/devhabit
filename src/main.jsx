import React from "react";
import ReactDOM from "react-dom";
import { FirebaseProvider } from "./context/FirebaseContext";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import Modal from "react-modal";
import Home from "./components/Home";
import { SignIn } from "./pages/auth/SignIn";
import Building from "./pages/building/Building";
import Roadmap from "./pages/roadmap/Roadmap";
import Profilee from "./pages/profile/Profilee";
import Contact from "./pages/contact/Contact";
import About from "./pages/about/About";
import Communitypage from "./pages/community/Communitypage";
import "./index.css";
import ThreeScene from "./ThreeScene";
Modal.setAppElement("#root");

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
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/profile",
        element: <Profilee />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/community",
        element: <Communitypage />
      }
    ],
  },
  {
    path: "*",
    element: <Building />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FirebaseProvider>
      <ThemeProvider>
        <RouterProvider router={router}>
          <Outlet />
        </RouterProvider>
      </ThemeProvider>
    </FirebaseProvider>
  </React.StrictMode>
);
