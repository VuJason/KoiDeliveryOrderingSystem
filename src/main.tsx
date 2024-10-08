import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import VerifyOTPPage from "./pages/VerifyOTPPage.tsx";
import ChangPasswordPage from "./pages/ChangePasswrod.tsx";
import App from "./App.tsx";
import TrackPage from "./pages/TrackPage.tsx";
import DashboardPage from  "./pages/DashboardPage.tsx";



const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage />,
  },
  {
    path: "/verify",
    element: <VerifyOTPPage />,
  },
  {
    path: "/change-password",
    element: <ChangPasswordPage />,
  },
  {
    path: "/track",
    element: <TrackPage />,
  },
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);