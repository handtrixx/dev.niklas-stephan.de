import { useEffect, useMemo } from "react";
import { AppProps } from "next/app";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Head from "next/head";
import CookieBanner from "../components/cookie-banner";
import { LocaleProvider, useLocale } from "../components/context-locale";
import '../styles/globals.scss';
import { frontendHost, frontendUrl } from "../utils/env.js";



function MyApp({
  Component,
  pageProps
}: AppProps & {}) {
  return (
  
      <MyAppInner Component={Component} pageProps={pageProps} />

  );
}


function SEO({ locale, description }) {
  const openGraph = useMemo(
    () => ({
      type: "website",
      locale: locale,
      url: frontendUrl.toString(),
      site_name: frontendHost,
      images: [
        {
          url: frontendUrl + "images/screenshot.jpg",
          width: 800,
          height: 600,
          alt: frontendHost,
        },
      ],
    }),
    [locale]
  );

  const twitter = useMemo(
    () => ({
      cardType: "summary_large_image",
    }),
    []
  );

  return (
    <DefaultSeo
      title={frontendHost}
      description={description}
      openGraph={openGraph}
      twitter={twitter}
    />
  );
}

function MyAppInner({ Component, pageProps }) {
  const description = "All about web development, IoT, DevOps and more.";

  return (
    <>
      <SEO locale="de" description={description} />
      <Head>
        <link rel="icon" href={frontendUrl + "images/favicon.png"} />
        <meta
          name="msapplication-TileImage"
          content={frontendUrl + "images/favicon.png"}
        />
        <link
          rel="apple-touch-icon-precomposed"
          href={frontendUrl + "images/favicon.png"}
          type="image/png"
        />
        <link
          rel="icon"
          href={frontendUrl + "images/favicon.png"}
          type="image/png"
          sizes="120x120"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />
      </Head>
      <Component {...pageProps} />
      <CookieBanner />
  </>
  );
}

export default MyApp;
