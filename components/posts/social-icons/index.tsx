import { frontendHost, frontendUrl } from "../../../utils/env.js";
import { useState, useRef } from "react";
import { Overlay, Tooltip } from "react-bootstrap";
import { Facebook, Twitter, Linkedin, EnvelopeFill, Whatsapp } from "react-bootstrap-icons";
import styles from "./index.module.css";

const SocialIcon = ({
  slug,
  ariaLabel,
  decodedTitle,
  socialNetwork,
  IconComponent,
  tooltipId,
  url,
}) => {
  const [showPopover, setShowPopover] = useState(false);
  const targetPopover = useRef(null);
  const pageurl = frontendUrl + "posts/" + slug.slug;
  const href = url
    .replace("{pageurl}", pageurl)
    .replace("{decodedTitle}", decodedTitle);

  const togglePopover = () => setShowPopover((prev) => !prev);

  return (
    <>
      <a
        className={styles["socialIcon"]}
        aria-label={ariaLabel}
        target="_blank"
        href={href}
        ref={targetPopover}
        onMouseEnter={togglePopover}
        onMouseLeave={togglePopover}
      >
        <IconComponent />
      </a>
      <Overlay
        target={targetPopover.current}
        show={showPopover}
        placement="bottom"
      >
        {(props) => <Tooltip {...props}>{tooltipId}</Tooltip>}
      </Overlay>
    </>
  );
};

export function SocialIcons(slug, decodedTitle) {
  return (
    <>
      <SocialIcon
        slug={slug}
        ariaLabel="Share on Facebook"
        decodedTitle={decodedTitle}
        socialNetwork="facebook"
        IconComponent={Facebook}
        tooltipId="Auf Facebook teilen"
        url="https://www.facebook.com/sharer/sharer.php?u={pageurl}&amp;src=sdkpreparse"
      />
      <SocialIcon
        slug={slug}
        ariaLabel="Share on X/Twitter"
        decodedTitle={decodedTitle}
        socialNetwork="twitter"
        IconComponent={Twitter}
        tooltipId="Auf X (Twitter) teilen"
        url="https://twitter.com/intent/tweet?text={pageurl}"
      />
      <SocialIcon
        slug={slug}
        ariaLabel="Share on LinkedIn"
        decodedTitle={decodedTitle}
        socialNetwork="linkedin"
        IconComponent={Linkedin}
        tooltipId="Auf LinkedIn teilen"
        url="https://www.linkedin.com/shareArticle?mini=false&url={pageurl}"
      />
      <SocialIcon
        slug={slug}
        ariaLabel="Share by mail"
        decodedTitle={decodedTitle}
        socialNetwork="mail"
        IconComponent={EnvelopeFill}
        tooltipId="Per E-Mail teilen"
        url="mailto:?subject={decodedTitle}&body={pageurl}"
      />
      <SocialIcon
        slug={slug}
        ariaLabel="Share on WhatsApp"
        decodedTitle={decodedTitle}
        socialNetwork="whatsapp"
        IconComponent={Whatsapp}
        tooltipId="Auf WhatsApp teilen"
        url="https://wa.me/?text={pageurl}"
      />
    </>
  );
}