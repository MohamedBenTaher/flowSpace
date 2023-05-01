import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AuthProvider } from '@/Context/Context'
export default function App({ Component, pageProps:{session,...pageProps} }: AppProps) {
  const queryClient = new QueryClient()
  return (

    <QueryClientProvider client={queryClient}>
       <AuthProvider>
        <SessionProvider session={session}>
              <Component {...pageProps} />
        </SessionProvider>
        </AuthProvider>
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}
