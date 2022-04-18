import "../styles/globals.scss";
import "open-props/style";
import { NextSeo } from "next-seo";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextSeo
        title="Calculator"
        titleTemplate="%s | oxholm.dev"
        defaultTitle="Calculator"
        description="Custom Calculator made in Next.js"
        canonical="https://calculator-one-brown.vercel.app/"
        openGraph={{
          url: "https://calculator-one-brown.vercel.app/",
          title: "Calculator",
          description: "Custom Calculator made in Next.js",
        }}
        twitter={{
          handle: "@OxholmDev",
          site: "@OxholmDev",
          cardType: "summary_large_image",
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
