import { useState, useRef } from "react";
import { useIntl } from "react-intl";
import { useLocale } from "../context-locale";
import Link from "next/link";
import { Translate as TranslateIcon } from "react-bootstrap-icons";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

function LanguageToggleLink() {
  const { locale, setLocale } = useLocale();
  const nextLocale = locale === "en" ? "de" : "en";
  const handleClick = (event) => {
    event.preventDefault();
    setLocale(nextLocale);
  };
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });

  const [showPopoverSelectLang, setShowPopoverSelectLang] = useState(false);
  const targetPopoverSelectLang = useRef(null);

  const togglePopoverSelectLang = () =>
    setShowPopoverSelectLang((prev) => !prev);

  return (
    <>
      <Link
        className="nav-link ms-sm-4 me-4 me-sm-2"
        href="#"
        aria-label="Switch Language"
        onClick={handleClick}
        ref={targetPopoverSelectLang}
        onMouseEnter={togglePopoverSelectLang}
        onMouseLeave={togglePopoverSelectLang}
      >
        <TranslateIcon className="me-1" />
        {locale}
      </Link>
      <Overlay
        target={targetPopoverSelectLang.current}
        show={showPopoverSelectLang}
        placement="bottom"
      >
        {(props) => (
          <Tooltip {...props}>
            {translate("nav.links.popover.selectlang")}
          </Tooltip>
        )}
      </Overlay>
    </>
  );
}

export default LanguageToggleLink;
