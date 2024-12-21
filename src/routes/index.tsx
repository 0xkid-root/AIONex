import { Routes as RouterRoutes, Route } from 'react-router-dom';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { LandingPage } from '@/pages/LandingPage';
import { Register } from '@/pages/auth/Register';
import { Login } from '@/pages/auth/Login';
import { Dashboard } from '@/pages/Dashboard';
import { Marketplace } from '@/pages/Marketplace';
import { AIWorkspace } from '@/pages/AIWorkspace';
import { ProviderDashboard } from '@/pages/ProviderDashboard';
import { ModelDetailsPage } from '@/pages/ModelDetailsPage';
import { WalletPage } from '@/pages/WalletPage';

export function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/marketplace" 
        element={
          <ProtectedRoute>
            <Marketplace />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/workspace" 
        element={
          <ProtectedRoute>
            <AIWorkspace />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/provider" 
        element={
          <ProtectedRoute requiredRole="provider">
            <ProviderDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/models/:id" 
        element={
          <ProtectedRoute>
            <ModelDetailsPage />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/wallet" 
        element={
          <ProtectedRoute>
            <WalletPage />
          </ProtectedRoute>
        } 
      />
    </RouterRoutes>
  );
}