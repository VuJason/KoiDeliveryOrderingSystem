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
import Dashboard from "./pages/Dashboard.tsx";
import BrowserTrack from  "./pages/BrowserTrack.tsx";
import DeliveryTrackPage from "./pages/DeliveryTrackPage.tsx";

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
    element: <Dashboard />,
  },
  {
    path: "/browser-track",
    element: <BrowserTrack />,
  },
  {
    path: "/delivery-track",
    element: <DeliveryTrackPage />,
  },

]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);