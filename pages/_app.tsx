import { useEffect, useMemo } from "react";
import { IntlProvider } from "react-intl";
import { AppProps } from "next/app";
import Cookies from "js-cookie";
import { parseCookies } from "nookies";
import { DefaultSeo } from "next-seo";
import { useRouter } from "next/router";
import Head from "next/head";
import CookieBanner from "../components/cookie-banner";
import { LocaleProvider, useLocale } from "../components/context-locale";
import '../styles/globals.scss'
import en from "../i18n/en.json";
import de from "../i18n/de.json";
import { frontendHost, frontendUrl } from "../utils/env.js";

const messages = {
  de,
  en,
};

function MyApp({
  Component,
  pageProps,
  initialLocale,
}: AppProps & { initialLocale: string }) {
  return (
    <LocaleProvider initialLocale={initialLocale}>
      <MyAppInner Component={Component} pageProps={pageProps} />
    </LocaleProvider>
  );
}

MyApp.getInitialProps = async ({ ctx }) => {
  const { locale } = parseCookies(ctx);
  return { initialLocale: locale || "de" };
};

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
  const { locale, setLocale } = useLocale();

  useEffect(() => {
    const storedLocale = Cookies.get("locale");
    if (storedLocale && storedLocale in messages) {
      setLocale(storedLocale);
    }
  }, [setLocale]);

  // Set the cookie outside of the useEffect hook
  let secure = false;
  if (typeof window !== 'undefined') {
    secure = window.location.protocol === "https:";
  }
  Cookies.set("locale", locale, {
    sameSite: secure ? "None" : "Lax",
    secure: secure,
    path: "/",
  });
  const description =
    locale === "en"
      ? "All about web development, IoT, DevOps and more."
      : "Alles rund um Webentwicklung, IoT, DevOps und mehr.";

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <SEO locale={locale} description={description} />
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
    </IntlProvider>
  );
}

export default MyApp;
