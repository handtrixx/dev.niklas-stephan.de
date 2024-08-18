import { useEffect, useMemo } from "react";
import { AppProps } from "next/app";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Head from "next/head";
import CookieBanner from "../components/cookie-banner";
import "../styles/globals.scss";
import env from "../utils/env";

function MyApp({ Component, pageProps }: AppProps & {}) {
  return <MyAppInner Component={Component} pageProps={pageProps} />;
}

function SEO({ locale, description }) {
  const openGraph = useMemo(
    () => ({
      type: "website",
      locale: locale,
      url: env.frontendUrl,
      site_name: env.frontendHost,
      images: [
        {
          url: env.frontendUrl + "images/screenshot.jpg",
          width: 800,
          height: 600,
          alt: env.frontendHost,
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
      title={env.frontendHost}
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
        <link rel="icon" href={env.frontendUrl + "images/favicon.png"} />
        <meta
          name="msapplication-TileImage"
          content={env.frontendUrl + "images/favicon.png"}
        />
        <link
          rel="apple-touch-icon-precomposed"
          href={env.frontendUrl + "images/favicon.png"}
          type="image/png"
        />
        <link
          rel="icon"
          href={env.frontendUrl + "images/favicon.png"}
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
