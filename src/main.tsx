import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import BrowserTrack from "./pages/BrowserTrack.tsx";
import ChangPasswordPage from "./pages/ChangePasswrod.tsx";
import DeliveryTrackPage from "./pages/DeliveryTrackPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import TrackPage from "./pages/TrackPage.tsx";
import VerifyOTPPage from "./pages/VerifyOTPPage.tsx";
import { adminRoutes } from "./routes/AdminRoutes.tsx";

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
    path: "/browser-track",
    element: <BrowserTrack />,
  },
  {
    path: "/delivery-track",
    element: <DeliveryTrackPage />,
  },
  ...adminRoutes,
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
