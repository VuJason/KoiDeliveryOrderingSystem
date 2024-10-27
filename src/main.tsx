import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import LoginPage from "./pages/LoginPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import VerifyOTPPage from "./pages/VerifyOTPPage.tsx";
import ChangPasswordPage from "./pages/ChangePasswrod.tsx";
import App from "./App.tsx";
import DeliveryHistory from "./pages/DeliveryHistory.tsx";
import Order from "./pages/Order.tsx";
import Account from "./pages/Account.tsx";
import TrackPage from "./pages/TrackPage.tsx";
import DeliveryTrackPage from "./pages/DeliveryTrackPage.tsx";
import BrowserTrack from "./pages/BrowserTrack.tsx";


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

    path: "/history",
    element: <DeliveryHistory />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/account",
    element: <Account />,
  },
  {
    path: "/delivery-track",
    element: <DeliveryTrackPage />
  },
  {
    path: "/browser-track",
    element: <BrowserTrack />
  }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);