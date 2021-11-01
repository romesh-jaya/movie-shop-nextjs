import 'antd/dist/antd.css'
import '../styles/globals.scss'
import 'pure-react-carousel/dist/react-carousel.es.css'
import type { AppProps } from 'next/app'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }: AppProps) {
  const bEURL = process.env.NEXT_PUBLIC_BE_URL
  if (!bEURL) {
    throw new Error('NEXT_PUBLIC_BE_URL cannot be null')
  }

  const client = new ApolloClient({
    uri: bEURL,
    cache: new InMemoryCache(),
  })

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
