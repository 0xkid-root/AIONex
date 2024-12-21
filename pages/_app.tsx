import React from 'react'
import type { AppProps } from 'next/app'
import { WagmiConfig } from 'wagmi'
import { config } from '@/lib/wagmi'
import { AuthProvider } from '@/contexts/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </WagmiConfig>
  )
}

export default MyApp 