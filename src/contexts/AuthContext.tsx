import { createContext, useContext, useCallback, useEffect } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '@/types/user';
import { useToast } from '@/hooks/useToast';

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: Error | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  signMessage: (message: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const { 
    address, 
    isConnected, 
    isConnecting,
    status 
  } = useAccount();

  const {
    connect,
    connectors: [connector],
    error: connectError,
    isLoading: isConnectLoading,
  } = useConnect();

  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();

  const login = useCallback(async () => {
    try {
      if (!isConnected) {
        await connect({ connector });
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
        body: JSON.stringify({ address, signature, nonce }),
      });

      if (!verifyResponse.ok) {
        throw new Error('Failed to verify signature');
      }

      const { user, token } = await verifyResponse.json();
      
      // Store auth token
      localStorage.setItem('auth_token', token);

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
  }, [isConnected, connect, connector, signMessageAsync, address, navigate, toast]);

  const logout = useCallback(async () => {
    disconnect();
    localStorage.removeItem('auth_token');
    navigate('/');
  }, [disconnect, navigate]);

  const signMessage = useCallback(async (message: string) => {
    return await signMessageAsync({ message });
  }, [signMessageAsync]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isConnected,
        isLoading: isConnecting || isConnectLoading,
        user: null, // Implement user state management
        error: connectError,
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