import 'antd/dist/antd.css'
import '../styles/globals.scss'
import 'pure-react-carousel/dist/react-carousel.es.css'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
export default MyApp
