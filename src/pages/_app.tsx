import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import DialogController from "@/components/dialogs/dialogs"
import Navbar from "@/components/navbar"
import { serverService } from "@/services/serverService"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SessionProvider session={session}>
      <Main />
      <Component {...pageProps} />
    </SessionProvider>
  );
}

const Main = () => {

  const router = useRouter();
  const isLoginPage = router.pathname == '/login';
  const session = useSession();

  if (session.status === "loading")
    return <div className="loading"/>

  if (session.status === "unauthenticated" && !isLoginPage) {
    router.replace("/login");
  }

  if (session.data && isLoginPage) {
    serverService.setSession(session.data);
    router.replace("/");
  }

  if (!isLoginPage)
    return (
      <>
        <Navbar />
        <DialogController />
      </>
    );
  return null;
}