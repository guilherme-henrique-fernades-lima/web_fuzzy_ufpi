import "@/styles/globals.css";
import GlobalStyles from "@/styles/GlobalStyles";

import Layout from "@/components/templates/Layout";
import ThemeContext from "@/context/ThemeContext";

export default function App({ Component, pageProps }) {
  return (
    <ThemeContext>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeContext>
  );
}
