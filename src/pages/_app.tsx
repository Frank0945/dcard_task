import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { getSession, SessionProvider, useSession } from "next-auth/react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import DialogController from "@/components/dialogs/dialogs"
import Navbar from "@/components/navbar"
import { serverService } from "@/services/serverService"

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  const router = useRouter();
  const [isLogin, setIsLogin] = useState(false);

  const isLoginPage = router.pathname == "/login";

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    /*console.log(session);
    serverService.session = session;*/
  }, []);


  function Status({ children }: any) {
    const session = useSession();
    if (session.status === "loading") {
      return <>Loading</>
    }
    serverService.session = session.data;
    return (
      <>
        {!isLoginPage && <Navbar />}
        <Component {...pageProps} />
        <DialogController />
      </>
    )
  }

  return (
    <SessionProvider session={session} >
      <Status />
    </SessionProvider >
  )
  /* useEffect(() => {
     console.log(session);
     serverService.session = session;
     require("bootstrap/dist/js/bootstrap.bundle.min.js");
     /*serverService.init().then((status) => {
       setIsLogin(status);
       if (!status)
         router.replace("/login")
     });
   }, []);
 
   //if (isLogin || isLoginPage)
   return (
     <SessionProvider session={session}>
       {!isLoginPage && <Navbar />}
       <Component {...pageProps} />
       <DialogController />
     </SessionProvider>
   );*/
}