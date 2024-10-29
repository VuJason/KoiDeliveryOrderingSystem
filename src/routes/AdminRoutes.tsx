import { Navigate } from "react-router-dom";
import AdminLayout from "../components/layouts/AdminLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import SettingsPage from "../pages/setting/SettingsPage";
import DeliveryPage from "../pages/DeliveryPage"; // Import trang Delivery


// Define routes with the AdminLayout wrapping them
export const adminRoutes = [
  {
    path: "/",
    element: <AdminLayout />, // Sử dụng AdminLayout trực tiếp tại đây
    children: [
      { path: "", element: <Navigate to="dashboard" replace /> }, // Chuyển hướng mặc định
      { path: "dashboard", element: <DashboardPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "delivery", element: <DeliveryPage /> }, // Thêm route cho trang Delivery

    ],
  },
];
