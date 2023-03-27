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

  const [sessionData, setSessionData] = useState(null);

  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");

    async function getSessionData() {
      // 获取会话信息
      const res = await fetch('/api/auth/session');
      const sessionData = await res.json();

      // 存储会话信息
      setSessionData(sessionData);
      serverService.session = sessionData;
      localStorage.setItem('sessionData', JSON.stringify(sessionData));
    }

    getSessionData();
  }, []);

  return (
    <SessionProvider session={sessionData} >
      {!isLoginPage && <Navbar />}
      <Component {...pageProps} />
      <DialogController />
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

function Status({ children }: any) {
  const session = useSession();
  console.log(session);
  serverService.session = session.data;
  if (session.status === "loading") {
    return <>Loading</>
  } else if (session.status === "unauthenticated") {
    return <>Unauthenticated</>
  } else {
    return <>Authenticated</>
  }
}
