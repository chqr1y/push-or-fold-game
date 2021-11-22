import React, { useEffect } from "react";
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/function-component-definition */
import { AppProps } from "next/app";
import { useRouter } from "next/router";
import * as gtag from "utils/gtag";
import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps) => {
    const router = useRouter();

    useEffect(() => {
        const handleRouteChange = (url: URL) => {
            gtag.pageview(url);
        };
        router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, [router.events]);

    return <Component {...pageProps} />;
};

export default App;
