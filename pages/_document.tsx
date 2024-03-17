import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        <script
            dangerouslySetInnerHTML={{
              __html: `
                var _paq = window._paq = window._paq || [];
                _paq.push(["disableCookies"]);
                _paq.push(['trackPageView']);
                _paq.push(['enableLinkTracking']);
                (function() {
                  var u="https://stats.handtrixxx.com/";
                  _paq.push(['setTrackerUrl', u+'matomo.php']);
                  _paq.push(['setSiteId', '1']);
                  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
                  g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
                })();
              `,
            }}
          />
        </Head>
        <body className="antialiased">
          <script
            dangerouslySetInnerHTML={{
              __html: `
              (function() {
                let colorScheme = 'light';
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                  colorScheme = 'dark';
                }
                document.documentElement.setAttribute('data-bs-theme', colorScheme);
              })();
            `,
            }}
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
