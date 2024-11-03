import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DeliveryTrackPage from "./pages/deliverystaff/DeliveryTrackPage";
import Header from "./components/Header";  // Đảm bảo import Header

function App() {
  return (
    <Router>
      <div className="App">
        <Header currentPage={undefined} /> {/* Header với nút "Make a delivery" */}
        <Routes>
          {/* Định nghĩa các route */}
          <Route path="/delivery-track" element={<DeliveryTrackPage />} />
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;