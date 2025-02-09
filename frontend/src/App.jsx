import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Shared/Layout';
import HomePage from './pages/HomePage';
import AdminPanel from './pages/AdminPanel';
import VerificationPortal from './components/Public/VerificationPortal';
import AboutPage from './pages/AboutPage';
import NFTDetails from './pages/NFTDetails';
import NotFound from './pages/NotFound';

// Web3
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from './config/wagmi.config'
const queryClient = new QueryClient()

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
