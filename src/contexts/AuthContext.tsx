import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useSignMessage } from 'wagmi';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../types/user';
import { useToast } from '../hooks/use-toast';
import { SiweMessage } from 'siwe';
import { injected } from '@wagmi/connectors';
import type { Config } from '@wagmi/core';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { connectAsync } = useConnect();
  const { disconnectAsync } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const { toast } = useToast();
  const navigate = useNavigate();

  const getNonce = async () => {
    try {
      const response = await fetch('/api/auth/nonce');
      const data = await response.json();
      return data.nonce;
    } catch (error) {
      console.error('Failed to get nonce:', error);
      throw error;
    }
  };

  const verifySignature = async (message: SiweMessage, signature: string) => {
    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      });

      if (!response.ok) throw new Error('Failed to verify signature');

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Failed to verify signature:', error);
      throw error;
    }
  };

  const signIn = useCallback(async () => {
    try {
      setIsLoading(true);

      // Connect wallet if not connected
      // Connect wallet if not connected
      if (!isConnected) {
        await connectAsync({
          connector: injected()
        });
      }

      if (!address) throw new Error('No wallet address');

      // Get nonce
      const nonce = await getNonce();

      // Create SIWE message
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to AIONex',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce,
      });

      // Sign message
      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      });

      // Verify signature
      const userData = await verifySignature(message, signature);
      setUser(userData);

      toast({
        title: 'Success',
        description: 'Successfully signed in',
      });

      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to sign in:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign in',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [address, isConnected, connectAsync, signMessageAsync, navigate, toast]);

  const signOut = useCallback(async () => {
    try {
      setIsLoading(true);
      await disconnectAsync();
      setUser(null);

      await fetch('/api/auth/signout', {
        method: 'POST',
      });

      toast({
        title: 'Success',
        description: 'Successfully signed out',
      });

      navigate('/');
    } catch (error) {
      console.error('Failed to sign out:', error);
      toast({
        title: 'Error',
        description: 'Failed to sign out',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }, [disconnectAsync, navigate, toast]);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Failed to check session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}