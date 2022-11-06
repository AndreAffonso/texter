import "../styles/globals.css";
import type { AppProps } from "next/app";

import { Reset } from "../src/styles/resetCss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Reset />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
