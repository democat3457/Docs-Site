import "../css/index.css";
import "../css/alerts.css";

import 'simplebar/dist/simplebar.min.css';
import React from "react";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
