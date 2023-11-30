import "@/styles/globals.css";
import GlobalStyles from "@/styles/GlobalStyles";
import Head from "next/head";

import Layout from "@/components/templates/Layout";
import ThemeContext from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContext>
      <Head>
        <title>UFPI - Sistema Fuzzy</title>
        <meta property="og:title" content="UFPI - Sistema Fuzzy" />
        <meta property="og:description" content="UFPI - Sistema Fuzzy" />
        <meta name="theme-color" content="#232323" />
        <meta name="msapplication-navbutton-color" content="#232323" />
        <meta name="apple-mobile-web-app-status-bar-style" content="#232323" />
      </Head>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext>
  );
}
