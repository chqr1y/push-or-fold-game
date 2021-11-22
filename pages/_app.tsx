import React from "react";
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */

import "../styles/globals.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;
