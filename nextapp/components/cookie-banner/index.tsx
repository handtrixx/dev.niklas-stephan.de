import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import { useIntl } from "react-intl";
import Link from "next/link";

const CookieBanner = () => {
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
  const router = useRouter();

  return (
    <CookieConsent
      location="bottom"
      buttonText={intl.formatMessage({ id: "cookie.banner.button" })}
      cookieName="CookieConsent"
      style={{ background: "#2B373B" }}
      buttonStyle={{
        color: "#fff",
        background: "#ec1327",
        borderRadius: "0.5rem",
        textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black",
      }}
      expires={150}
    >
      <small>
        {intl.formatMessage({ id: "cookie.banner.text" })}{" "}
        <Link href="/page/privacy" className="text-white underline">
          {intl.formatMessage({ id: "cookie.banner.link" })}
        </Link>
      </small>
    </CookieConsent>
  );
};

export default CookieBanner;
