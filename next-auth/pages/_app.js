import '../styles/globals.css'
import "../components/Navbar.css"
import Navbar from "../components/Navbar"
import Head from 'next/head'
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps }) {
if(Component.getLayout){
  return Component.getLayout(
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
  <Component {...pageProps} />
  </SessionProvider>
  )
}

  return (
    <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
       <Head>
        <title>NEXTAUTH</title>
        <meta name='description' content='Next Practice' />
      </Head>
      <Navbar />
  <Component {...pageProps} />
  </SessionProvider>
  )
}

export default MyApp
