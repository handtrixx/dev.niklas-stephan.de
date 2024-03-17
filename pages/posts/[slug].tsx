import { frontendHost, frontendUrl, backendUrl } from "../../utils/env.js";
import Link from "next/link";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import {
  useContext,
  useEffect,
  useRef,
  useCallback,
  useState,
  useMemo,
} from "react";
import StylesContext from "../../components/context-styles";
import { useIntl } from "react-intl";
import { NextSeo } from "next-seo";
import he from "he";
import { getPostData } from "../../utils/getPostData";
import { getStaticPathsPosts } from "../../utils/getStaticPathsPosts";
import { format } from "date-fns";
import styles from "./index.module.css";
import { SocialIcons } from "../../components/social-icons";
import PostContent from "../../components/post-content";
import PostNav from "../../components/post-nav";

const DEFAULT_POST_IMAGE = backendUrl + "images/screenshot.jpg";
const DATE_FORMAT = "yyyy/MM/dd";
const DATE_FORMAT_DE = "dd.MM.yyyy";

export default function Post({
  title,
  content,
  excerpt,
  date,
  lang,
  slug,
  featuredImage,
  translations,
  translatedHeadlines,
}) {
  const translate = (id) => intl.formatMessage({ id });
  const intl = useIntl();
  const gutenberg = useContext(StylesContext);
  const figuresRef = useRef(null);
  const postImage = featuredImage || DEFAULT_POST_IMAGE;
  const decodedTitle = he.decode(title);
  const decodedExcerpt = he.decode(excerpt);
  const pageExcerpt = decodedExcerpt.replace(/<\/?[^>]+(>|$)/g, "");
  const pageurl = frontendUrl + "posts/" + slug;
  const dateFormat = intl.locale === "de" ? DATE_FORMAT_DE : DATE_FORMAT;
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
                <h1 className="mb-0">Blog.</h1>
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
              contentLang={lang}
              translations={translations}
              translatedHeadlines={translatedHeadlines}
            />
          </div>
          <div className="col-12 col-lg-2 d-none d-lg-block">
            <div className={styles.stickyTop + " sticky-top"}>
              <div className="fs-5">{translate("post.headline.content")}</div>
              <PostNav
                content={content}
                translations={translations}
                contentLang={lang}
              />
            </div>
          </div>
        </div>
      </div>
      <FooterNavigation />
    </>
  );
}

export async function getStaticPaths() {
  return await getStaticPathsPosts();
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  const post = await getPostData(params.slug);

  const sourcelang = post.lang;
  let targetlang = "en";
  if (sourcelang === "en") {
    targetlang = "de";
  }

  // Dynamically import the fetchTranslations function
  const { fetchTranslations } = await import("../../utils/translations");

  const translations = await fetchTranslations(
    post.content,
    sourcelang,
    targetlang
  );
  const translatedHeadlines = await fetchTranslations(
    post.title,
    sourcelang,
    targetlang
  );
  return {
    props: {
      ...post,
      translations,
      translatedHeadlines,
    },
  };
};
