import React, { useState, useMemo, useCallback } from "react";
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
  published: string;
  language: string;
}

export default function PostContent({
  title,
  content,
  published,
  language,
}: PostContentProps) {
  const [showAlert, setShowAlert] = useState(true);

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
                const additionalData = {}; // Replace with actual data as needed
                return createPre(element, additionalData);
              }
              break;
          }
        }
      },
    };
    return parse(content, options);
  }, [content]);

  const displayedTitle = useMemo(() => {
    return { __html: title };
  }, [title]);

  let postlang = "Deutsch";
  if (language === "en") {
    postlang = "Englisch";
  }

  return (
    <>
      <h2 dangerouslySetInnerHTML={displayedTitle} />
      <p className="">
        Verfasst in: {postlang} / Veröffentlicht am: {published} / Lesezeit:{" "}
        {Math.ceil(content.split(" ").length / 200)} Minute(n)
      </p>
      {parsedContent}
    </>
  );
}
