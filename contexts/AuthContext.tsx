import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { useAccount, useSignMessage } from 'wagmi'
import type { SiweMessage } from 'siwe'

declare module 'iron-session' {
  interface IronSessionData {
    nonce?: string
    siwe?: SiweMessage
  }
}

interface AuthContextType {
  isAuthenticated: boolean
  login: () => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const { address } = useAccount()
  const { signMessageAsync } = useSignMessage()

  useEffect(() => {
    checkAuthStatus()
  }, [])

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/verify')
      setIsAuthenticated(response.status === 200)
    } catch (error) {
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async () => {
    try {
      const nonce = await fetch('/api/auth/nonce').then(res => res.text())
      
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId: 1,
        nonce,
      })

      const signature = await signMessageAsync({
        message: message.prepareMessage(),
      })

      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message, signature }),
      })

      if (response.ok) {
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.error('Login failed:', error)
      setIsAuthenticated(false)
    }
  }

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext) 