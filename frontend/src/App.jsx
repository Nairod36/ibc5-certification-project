import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import VerificationPortal from './components/Public/VerificationPortal';
import AboutPage from './pages/AboutPage';
import NFTDetails from './pages/NFTDetails';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/verify" element={<VerificationPortal />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/nft/:tokenId" element={<NFTDetails />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
