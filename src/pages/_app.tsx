import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DialogController from "@/components/dialogs/dialogs"
import Navbar from "@/components/navbar"
import { serverService } from "@/services/serverService"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const [show, setShow] = useState(false);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <SessionProvider session={session}>
      <Main show={() => setShow(true)} />
      {show &&
        <Component {...pageProps} />
      }
    </SessionProvider>
  );
}

const Main = (props: { show: () => void }) => {

  const router = useRouter();
  const isLoginPage = router.pathname == '/login';
  const session = useSession();

  if (session.status === "unauthenticated" && !isLoginPage)
    router.replace("/login");

  if (session.data && isLoginPage) {
    serverService.setSession(session.data);
    router.replace("/");
    return null;
  }

  if ((session.data || isLoginPage) && session.status != "loading")
    props.show();

  if (!isLoginPage && session.data)
    return (
      <>
        <Navbar />
        <DialogController />
      </>
    );
  return null;
}