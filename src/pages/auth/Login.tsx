import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const { login, isLoading, error } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await login();
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">Login to AIONex</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            Connect your wallet to access the platform
          </p>
          {error && (
            <p className="text-red-600 text-sm">
              {error.message}
            </p>
          )}
          <Button
            onClick={handleLogin}
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </Button>
          <p className="text-sm text-center">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 hover:underline">
              Register here
            </a>
          </p>
        </div>
      </Card>
    </div>
  );
} 