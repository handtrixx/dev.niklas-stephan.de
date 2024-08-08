import { useRouter } from "next/router";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

const CookieBanner = () => {
  const router = useRouter();

  return (
    <CookieConsent
      location="bottom"
      buttonText="Verstanden" 
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
        Um Dir ein optimales Erlebnis zu bieten, verwende ich einen sogenannten Cookie, um Deine bevorzugte Sprache für Dich zu speichern.  Außerdem nutze ich einen Cookie um Deine Entscheidung diesen Dialog auszublenden zu speichern. Weitere Cookies für sogenannte Web Analytics oder andere nicht 
        essenzielle Zwecke werden von mir nicht eingesetzt. Weitere Informationen dazu findest Du in meiner&nbsp;
        <Link href="/page/privacy" className="text-white underline">
           Datenschutzerklärung
        </Link> . 
      </small>
    </CookieConsent>
  );
};

export default CookieBanner;
