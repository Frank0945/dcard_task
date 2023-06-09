import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DialogController from "@/components/dialogs/dialogs"
import Navbar from "@/components/navbar"
import { serverService } from "@/services/serverService"
import Head from 'next/dist/shared/lib/head'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const isLoginPage = router.pathname == "/login";

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    serverService.init().then((status) => {
      setIsLogin(status);
      setIsLoading(false);
      if (!status)
        router.replace("/login")
    });
  }, []);

  useEffect(() => {
    if (isLogin && isLoginPage)
      router.replace("/");
  }, [isLogin]);

  if ((isLogin && !isLoginPage || !isLogin && isLoginPage) && !isLoading)
    return (
      <>
        <Head>
          <link rel="icon" type="image/x-icon" href="/favicon.ico" />
          <title>Task</title>
        </Head>
        <SessionProvider session={session}>
          {!isLoginPage && <Navbar />}
          <Component {...pageProps} />
          <DialogController />
        </SessionProvider>
      </>
    );
}