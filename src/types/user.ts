export interface UserProfile {
  address: string;
  username?: string;
  email?: string;
  role?: 'user' | 'provider' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: UserProfile | null;
  error: Error | null;
}
