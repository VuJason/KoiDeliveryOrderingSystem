import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import LandingPage from './LandingPage';
import BrowserTrack from './pages/BrowserTrack';
import TrackPage from './pages/TrackPage';
import DeliveryTrackPage from './pages/DeliveryTrackPage';

const App: React.FC = () => {
  return (
    <OrderProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/browser-track" element={<BrowserTrack />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/delivery-track" element={<DeliveryTrackPage />} />
        </Routes>
      </Router>
    </OrderProvider>
  );
};

export default App;