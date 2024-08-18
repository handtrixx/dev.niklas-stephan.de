import Image from "next/image";

export function createImage(element, isLink = false) {
  function cleanChilds(el) {
    if (typeof el !== "object" || !el.children) {
      return el;
    }
    el.children = el.children
      .filter((child) => {
        return (
          child.name !== "button" &&
          !(
            child.name === "div" &&
            child.attribs.class === "wp-lightbox-overlay zoom"
          )
        );
      })
      .map(cleanChilds);
    return el;
  }
  function cleanImg(img) {
    if (img.attribs?.src) {
      const {
        width = "400",
        height = "400",
        alt = "niklas-stephan.de",
        src,
      } = img.attribs;
      return {
        ...img,
        attribs: {
          src,
          alt,
          width,
          height,
          className: "p-3",
        },
      };
    }
    return img;
  }
  element = { ...element, attribs: { class: element.attribs.class } };
  element = cleanChilds(element);
  if (element.children[0].name === "img") {
    element.children[0] = cleanImg(element.children[0]);
    const img = element.children[0];
    const image = <Image alt={img.attribs.alt} {...img.attribs} />;
    return (
      <a
        href={img.attribs.src}
        target="_blank"
        aria-label="Open in new tab"
        className={element.attribs.class}
        rel="noopener noreferrer"
      >
        {image}
      </a>
    );
  }
  return element;
}