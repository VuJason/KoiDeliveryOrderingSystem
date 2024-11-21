import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SettingsPage from "../pages/setting/SettingsPage";
import DeliveryPage from "../pages/DeliveryPage"; // Import trang Delivery
import AdminUserPage from "../pages/AdminUserPage";
import AdminKoiFishPage from "../pages/AdminKoiFishPage";
import AdminFeedbackPage from "../pages/AdminFeedbackPage";

// Define routes with the AdminLayout wrapping them
export const adminRoutes = [
  {
    path: "/",
    element: <AdminLayout />, // Sử dụng AdminLayout trực tiếp tại đây
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> }, // Chuyển hướng mặc định
      { path: "dashboard", element: <DashboardPage /> },
      { path: "users", element: <AdminUserPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "delivery", element: <DeliveryPage /> }, // Thêm route cho trang Delivery
      { path: "koifish", element: <AdminKoiFishPage /> }, // Thêm route cho trang Delivery
      { path: "feedback", element: <AdminFeedbackPage /> }, // Thêm route cho trang Delivery
    ],
  },
];
