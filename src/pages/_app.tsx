import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { serverService } from '@/services/serverService'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    serverService.init().then((status) => {
      setIsLogin(status);
      if (!status)
        router.replace("/login")
    });
  }, []);

  if (isLogin || router.pathname == "/login")
    return (
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    );
}
