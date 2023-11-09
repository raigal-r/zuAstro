import '@/styles/globals.css'
import { useRouter } from 'next/router'
import type { AppProps } from 'next/app'
import { ZupassPopupRedirect } from './login';


export default function App({ Component, pageProps }: AppProps) {

  return <Component {...pageProps} />
  
}
