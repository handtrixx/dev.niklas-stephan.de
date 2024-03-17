import React, { useState, useEffect, useRef } from "react";
import { useIntl } from "react-intl";
import { Nav } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";
import { CircleHalf, Sun, MoonStars } from "react-bootstrap-icons";

const ColorToggleLink = () => {
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
  const [currentColorScheme, setCurrentColorScheme] = useState("light");

  useEffect(() => {
    const colorScheme = document.documentElement.getAttribute("data-bs-theme") || "light";
    setCurrentColorScheme(colorScheme);
  }, []);

  const toggleColorScheme = () => {
    const newColorScheme = currentColorScheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-bs-theme", newColorScheme);
    setCurrentColorScheme(newColorScheme);
  };

  const [showPopoverTheme, setShowPopoverTheme] = useState(false);
  const targetPopoverTheme = useRef(null);

  const togglePopoverTheme = () => setShowPopoverTheme((prev) => !prev);

  return (
    <>
      <Nav.Link
        onClick={toggleColorScheme}
        ref={targetPopoverTheme}
        aria-label="Change Theme"
        onMouseEnter={togglePopoverTheme}
        onMouseLeave={togglePopoverTheme}
      >
        {currentColorScheme === "light" ? <Sun className="mx-2" /> : <MoonStars className="mx-2" />}
      </Nav.Link>
      <Overlay
        target={targetPopoverTheme.current}
        show={showPopoverTheme}
        placement="bottom"
      >
        {(props) => (
          <Tooltip {...props}>{translate("nav.links.popover.theme")}</Tooltip>
        )}
      </Overlay>
    </>
  );
};

export default ColorToggleLink;