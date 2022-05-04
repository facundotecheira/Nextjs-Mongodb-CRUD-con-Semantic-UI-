import 'semantic-ui-css/semantic.min.css'
import '../styles/globals.css'
import { Layout } from 'components/Layaout'
function MyApp({ Component, pageProps }) {
  return <Layout>
    <Component {...pageProps} />
  </Layout>
}

export default MyApp
