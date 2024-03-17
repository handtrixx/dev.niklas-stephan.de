import React, { useState, useMemo, useCallback } from "react";
import { useIntl } from "react-intl";
import Link from "next/link";
import { Alert } from "react-bootstrap";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import { Node, Element as DomElement } from "domhandler";
import { useLocale } from "../context-locale";
import { createPre } from "../post-code";
import { createImage } from "../post-image";

interface PostContentProps {
  title: string;
  content: string;
  contentLang: string;
  published: string;
  translations: string;
  translatedHeadlines: string;
}

export default function PostContent({
  title,
  content,
  contentLang,
  published,
  translations,
  translatedHeadlines,
}: PostContentProps) {
  const [showAlert, setShowAlert] = useState(true);
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
  const languageNames = {
    en: translate("lang.en"),
    de: translate("lang.de"),
  };

  const contentLangText = languageNames[contentLang];

  const { locale, setLocale } = useLocale();
  const nextLocale = locale === "en" ? "de" : "en";
  const handleLangClick = useCallback(
    (event) => {
      event.preventDefault();
      setLocale(nextLocale);
    },
    [nextLocale, setLocale]
  );

  const langWarning =
    contentLang != intl.locale && showAlert ? (
      <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
        {intl.formatMessage({ id: "post.alert.wronglang" })}
        <Link className="alert-link" href="#" onClick={handleLangClick}>
          Link to {nextLocale} version
        </Link>
      </Alert>
    ) : (
      ""
    );

  const parsedContent = useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace: (domNode: Node) => {
        if (
          domNode.type === "tag" ||
          domNode.type === "script" ||
          domNode.type === "style"
        ) {
          const element = domNode as unknown as DomElement;
          switch (element.name) {
            case "h2":
            case "h3":
              if (
                element.children &&
                element.children[0] &&
                element.children[0].type === "text"
              ) {
                const textNode = element.children[0];
                const id = textNode.data.toLowerCase().replace(/\s+/g, "-");
                return React.createElement(element.name, { id }, textNode.data);
              }
              break;
            case "figure":
              return createImage(element);
              break;
            case "pre":
              if (
                element.attribs &&
                element.attribs["data-enlighter-language"]
              ) {
                return createPre(element, intl);
              }
              break;
          }
        }
      },
    };

    return parse(contentLang != intl.locale ? translations : content, options);
  }, [contentLang, translations, content, intl]);

  const displayedTitle = useMemo(() => {
    return { __html: contentLang != intl.locale ? translatedHeadlines : title };
  }, [contentLang, intl.locale, translatedHeadlines, title]);

  return (
    <>
      <h2 dangerouslySetInnerHTML={displayedTitle} />
      <p className="">
        {translate("post.headline.lang")} {contentLangText} /{" "}
        {translate("post.headline.published")} {published} /{" "}
        {translate("post.headline.readtime")}{" "}
        {Math.ceil(content.split(" ").length / 200)}{" "}
        {translate("post.headline.minutes")}
      </p>
      {langWarning}
      {parsedContent}
    </>
  );
}