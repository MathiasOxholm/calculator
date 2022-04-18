import "../styles/globals.scss";
import "open-props/style";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
