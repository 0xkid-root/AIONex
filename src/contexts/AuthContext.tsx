import { createContext, useContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/useToast';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useAccount, useSignMessage } from 'wagmi';

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { handleLogOut } = useDynamicContext();
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  
  const [user, setUser] = useState<UserProfile | null>(null);

  const login = useCallback(async () => {
    try {
      if (!address) {
        throw new Error('No wallet connected');
      }

      // Get nonce from backend
      const nonceResponse = await fetch('/api/auth/nonce');
      const { nonce } = await nonceResponse.json();

      // Sign message
      const signature = await signMessageAsync({
        message: `Sign this message to verify your identity. Nonce: ${nonce}`,
      });

      // Verify signature with backend
      const verifyResponse = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          address,
          signature,
          nonce
        }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Failed to verify signature');
      }

      const { user: userData, token } = await verifyResponse.json();

      // Store auth token and user data
      localStorage.setItem('auth_token', token);
      setUser(userData);

      toast({
        title: 'Success',
        description: 'Successfully logged in',
        variant: 'success',
      });

      navigate('/dashboard');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to login',
        variant: 'destructive',
      });
      throw error;
    }
  }, [address, signMessageAsync, navigate, toast]);

  const logout = useCallback(async () => {
    try {
      await handleLogOut();
      localStorage.removeItem('auth_token');
      setUser(null);
      navigate('/');
      
      toast({
        title: 'Success',
        description: 'Successfully logged out',
        variant: 'success',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to logout',
        variant: 'destructive',
      });
    }
  }, [handleLogOut, navigate, toast]);

  const signMessage = useCallback(async (message: string) => {
    if (!address) {
      throw new Error('No wallet connected');
    }
    return await signMessageAsync({ message });
  }, [address, signMessageAsync]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isConnected && !!user,
        user,
        login,
        logout,
        signMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};