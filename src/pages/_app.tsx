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

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const isLoginPage = router.pathname == '/login';

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
    /*serverService.init().then((status) => {
      setIsLogin(status);
      if (!status)
        router.replace("/login")
    });*/
  }, []);

  const Layout = ({ children }: any) => {
    const session = useSession();
    if (session.status === "loading") {
      return <>skeleton UI</>
    } else if (session.status === "unauthenticated") {
      return <>not logged in</>
    }
    if (session.data) {
      console.log(session.data);
      serverService.session = session.data;
      setIsLogin(true);
    }
    return null;
  }

  // if (isLogin || isLoginPage)
  return (
    <SessionProvider session={session}>
      <Layout>
      </Layout>
      {isLogin &&
        <>
          <Navbar />
          <DialogController />
        </>
      }
      <Component {...pageProps} />
    </SessionProvider>
  );
}




/*const Layout = ({ children }: any) => {
  const session = useSession();

  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    if (session.data) {
      serverService.session = session.data;
      setIsLogin(true);
    }

  }, [session]);

  return (
    <>
      {isLogin &&
        <>
          <Navbar />
          <DialogController />
        </>
      }
    </>
  );
}*/