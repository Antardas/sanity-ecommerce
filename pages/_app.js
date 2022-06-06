import { Layout } from "../components";
import { StateContext } from "../context/StateContext";
import "../styles/globals.css";
import {Toaster} from 'react-hot-toast';
console.log(process.env.STRIPE_SECRET_KEY, 'STRIPE_SECRET_KEY');

function MyApp({ Component, pageProps }) {
  return (
    <StateContext>
      <Layout>
        <Toaster/>
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  );
}

export default MyApp;
