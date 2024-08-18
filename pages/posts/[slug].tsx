import React, { useState, useMemo, useCallback, useContext, useEffect, useRef} from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import Head from "next/head";
import { NextSeo } from "next-seo";
import he from "he";
import { format } from "date-fns";
import parse, { HTMLReactParserOptions, DOMNode, Element as DomElement } from "html-react-parser";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import StylesContext from "../../components/context-styles";
import { SocialIcons } from "../../components/posts/social-icons";
import PostNav from "../../components/posts/post-nav";
import { createPre } from "../../components/posts/post-code";
import { createImage } from "../../components/posts/post-image";
import styles from "./index.module.css";
import env from "../../utils/env";


interface PostContentProps {
  title: string;
  content: string;
  published: string;
}

const frontendHost = env.frontendHost;
const frontendUrl = env.frontendUrl;
const backendUrl = env.apiUrl;
const DEFAULT_POST_IMAGE = backendUrl + "images/screenshot.jpg";

export default function Post({
  title,
  content,
  excerpt,
  date,
  lang,
  slug,
  featuredImage,
}) {
  const gutenberg = useContext(StylesContext);
  const figuresRef = useRef(null);
  const postImage = featuredImage || DEFAULT_POST_IMAGE;
  const decodedTitle = he.decode(title);
  const decodedExcerpt = he.decode(excerpt);
  const pageExcerpt = decodedExcerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const pageurl = frontendUrl + "posts/" + slug;
  const dateFormat = "dd.MM.yyyy";
  const postDate = useMemo(
    () => format(new Date(date), dateFormat),
    [date, dateFormat]
  );

  return (
    <>
      <NextSeo
        title={decodedTitle + " - " + frontendHost}
        description={pageExcerpt}
        openGraph={{
          url: pageurl,
          title: decodedTitle,
          description: pageExcerpt,
          images: [
            {
              url: postImage,
              alt: decodedTitle,
            },
          ],
        }}
      />

      <TopNavigation />
      <div className="container-xl">
        <div className="row mb-3">
          <div className="col-12 d-flex align-items-center">
            <div>
              <Link className="text-decoration-none" href="/blog">
                <h1 className="mb-0">Projekte & Blog.</h1>
              </Link>
            </div>
            <div className="ms-auto">
              <SocialIcons
                pageurl={pageurl}
                decodedTitle={decodedTitle}
                slug={slug}
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-lg-10">
            <PostContent
              title={title}
              content={content}
              published={postDate}
            />
          </div>
          <div className="col-12 col-lg-2 d-none d-lg-block">
            <div className={styles.stickyTop + " sticky-top"}>
              <div className="fs-5">Inhalt</div>
              <PostNav content={content} />
            </div>
          </div>
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}

export async function getStaticPaths() {
  try {
    const res = await fetch(env.apiUrl + "/wp-json/babelnext/v1/posts", {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": env.apiToken,
      },
    });
    const posts = await res.json();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));
   
    return { paths, fallback: "blocking" };
  } catch (error) {
    console.error("Failed to get static paths:", error);
    return { paths: [], fallback: "blocking" };
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  console.log(params);

  try {
    const res = await fetch(`${env.apiUrl}/wp-json/babelnext/v1/posts?slug=${params.slug}`, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": env.apiToken,
      },
    });
    const post = await res.json();
    console.log(post);
    return {
      props: {
        title: post.post_title,
        content: post.post_content,
        excerpt: post.post_excerpt,
        date: post.post_date,
        //lang: post.lang,
        slug: post.post_name,
        //featuredImage: post.featured_image_url,
      },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Failed to get post data:", error);
    return { props: {} };
  }
};


function PostContent({
  title,
  content,
  published
}: PostContentProps) {
  const [showAlert, setShowAlert] = useState(true);

  const parsedContent = useMemo(() => {
    const options: HTMLReactParserOptions = {
      replace: (domNode: DOMNode) => {
        if (
          domNode.type === "tag" ||
          domNode.type === "script" ||
          domNode.type === "style"
        ) {
          const element = domNode as DomElement;
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