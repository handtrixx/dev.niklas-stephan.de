import React from "react";
import ReactDOM from "react-dom/client";
import { CopyToClipboard } from "react-copy-to-clipboard";
import hljs from "highlight.js";
import { Button, Modal, Overlay } from "react-bootstrap";
import { ClipboardPlus, ArrowsFullscreen } from "react-bootstrap-icons";
import "highlight.js/styles/atom-one-dark.css"; // Import the style you want to use
import english from "../../i18n/en.json";
import german from "../../i18n/de.json";
import styles from "./index.module.css";

const showModal = (locale) => {
  const modal = document.createElement("div");
  document.body.appendChild(modal);
  const root = ReactDOM.createRoot(modal);
  let copyConfirmation = "";
  if (locale === "en") {
    copyConfirmation = english["post.button.copyConfirmation"];
  } else {
    copyConfirmation = german["post.button.copyConfirmation"];
  }
  root.render(
    <Modal show={true} onHide={() => root.unmount()}>
      <Modal.Header closeButton className="border-0">
        {copyConfirmation}
      </Modal.Header>
    </Modal>
  );
};

const toggleFullscreen = (code) => {
  if (typeof window !== "undefined") {
    const blob = new Blob([code], {
      type: "text/plain;charset=utf-8",
    });
    const objectURL = URL.createObjectURL(blob);
    window.open(objectURL, "_blank");
  }
};

export function createPre(element, intl) {
  if (element.attribs && element.attribs["data-enlighter-language"]) {
    let language = element.attribs["data-enlighter-language"];
    element.attribs = {};
    // If the language is "generic", use "plaintext" instead
    if (language === "generic") {
      language = "plaintext";
    }
    // Get the code from the element's children
    const code = element.children[0].data;
    // Highlight the code
    const highlightedCode = hljs.highlight(code, { language }).value;

    return (
      <div className={styles.relative}>
        <div
          className={`${styles.absolute} ${styles["top-0"]} ${styles["right-0"]}`}
        >
          <CopyToClipboard text={code} onCopy={() => showModal(intl.locale)}>
            <Button
              className="btn-sm me-1 mt-1 border-0"
              aria-label="Copy to clipboard"
              variant="outline-primary"
            >
              <ClipboardPlus />
            </Button>
          </CopyToClipboard>
          <Button
            className="btn-sm me-1 mt-1 border-0"
            aria-label="Show in fullscreen"
            variant="outline-primary"
            onClick={() => toggleFullscreen(code)}
          >
            <ArrowsFullscreen />
          </Button>
        </div>
        <pre className="bg-black text-success p-3 font-monospace rounded">
          <code dangerouslySetInnerHTML={{ __html: highlightedCode }} />
        </pre>
      </div>
    );
  } else {
    return element;
  }
}