import React, { useEffect, useState } from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";
import styles from "./index.module.css";
import { Nav } from "react-bootstrap";
import { ArrowUpCircle } from "react-bootstrap-icons";
import { Node, Element as DomElement } from "domhandler";

export default function PostNav({ content }) {
  const [headlines, setHeadlines] = useState([]);
  const [activeKey, setActiveKey] = useState("");

  useEffect(() => {
    let newHeadlines = [];
    const options: HTMLReactParserOptions = {
      replace: (domNode) => {
        if (domNode.type === "tag") {
          const element = domNode as unknown as DomElement;
          if (element.name === "h2" || element.name === "h3") {
            if (
              element.children &&
              element.children[0] &&
              element.children[0].type === "text"
            ) {
              const id = element.children[0].data
                .toLowerCase()
                .replace(/\s+/g, "-");
              newHeadlines.push({ id, title: element.children[0].data });
              return React.createElement(
                element.name,
                { id },
                element.children[0].data
              );
            }
          }
        }
      },
    };

    parse(content, options);

    setHeadlines(newHeadlines);
  }, [content]);

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveKey = "";
      let closestDistance = Infinity;
      headlines.forEach((headline) => {
        const element = document.getElementById(headline.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= 0 && rect.top < closestDistance) {
            closestDistance = rect.top;
            currentActiveKey = headline.id;
          }
        }
      });
      setActiveKey(currentActiveKey);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headlines]);

  return (
    <small>
      <Nav activeKey={activeKey} className="d-block mb-3">
        {headlines.map((headline, index) => (
          <Nav.Link
            key={index}
            href={`#${headline.id}`}
            className={`${styles.navIcon} nav-link px-0 py-1`}
            eventKey={headline.id}
            style={
              activeKey === headline.id ? { color: "var(--bs-primary)" } : {}
            }
          >
            {headline.title}
          </Nav.Link>
        ))}
      </Nav>
      <div>
        <a
          className={`${styles.navIcon} nav-link text-decoration-none`}
          href="#"
        >
          <ArrowUpCircle className="me-1" />
          Nach Oben
        </a>
      </div>
    </small>
  );
}
