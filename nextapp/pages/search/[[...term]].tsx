import { useEffect, useRef, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  CalendarWeekFill,
  Translate,
  Search,
  Tag,
} from "react-bootstrap-icons";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import styles from "./search.module.css";
import {
  frontendHost,
  frontendUrl,
  backendHost,
  backendUrl,
} from "../../utils/env.js";

export default function Page({ content = [] }) {
  const router = useRouter();
  const intl = useIntl();
  const [filter, setFilter] = useState("");
  const [filteredContent, setFilteredContent] = useState([]);
  const searchTerm = Array.isArray(router.query.term)
    ? router.query.term.join("/")
    : router.query.term || "";

  // Define a helper function to translate messages
  const translate = (id) => intl.formatMessage({ id });

  useEffect(() => {
    // Filter posts and pages when `filter` state changes
    setFilteredContent(
      content.filter((content) => content.title.includes(filter))
    );
  }, [filter, content]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <TopNavigation />
      <Container fluid={"xl"}>
        <Row>
          <Col>
            <h1>{translate("page.search.headline")}</h1>
          </Col>
        </Row>
        <Row>
          <Col xs={12} md={2} xl={3}></Col>
          <Col xs={12} md={8} xl={6}>
            <div className="input-group my-5">
              <input
                ref={inputRef}
                className="form-control form-control-lg form-control-search me-2"
                type="text"
                defaultValue={searchTerm}
                placeholder={translate("page.search.query")}
                aria-label="search term"
                onKeyPress={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    router.push(
                      `/search/${(event.target as HTMLInputElement).value}`
                    );
                  }
                }}
              />
              <div
                className="btn btn-outline-primary border-0 rounded align-self-center"
                onClick={() => {
                  router.push(`/search/${inputRef.current.value}`);
                }}
              >
                <Search size={24} />
              </div>
            </div>
          </Col>
          <Col xs={12} md={2} xl={3}></Col>
        </Row>
        {filteredContent.length > 0
          ? filteredContent.map((content) => (
              <Link
                href={`/${content.type}/${content.slug}`}
                key={`${content.type}-${content.id}`}
                className="text-decoration-none"
              >
                <Container fluid className="bg-light-subtle shadow-sm mb-3 p-3">
                  <Row>
                    <div className="col-4 col-lg-2">
                      <Image
                        src={content.image}
                        alt={content.title}
                        width="200"
                        height="200"
                        className="img-fluid"
                      />
                    </div>
                    <div className="col-8 col-lg-10 text-body-primary">
                      <h5
                        className="strong"
                        dangerouslySetInnerHTML={{ __html: content.title }}
                      />
                      <div
                        className={styles.excerpt}
                        dangerouslySetInnerHTML={{ __html: content.excerpt }}
                      />
                      <div className="mt-1 d-flex align-items-center">
                        <small className="me-2 d-flex align-items-center text-body-secondary">
                          <Translate className="me-1" />
                          <div
                            dangerouslySetInnerHTML={{ __html: content.lang }}
                          />
                        </small>

                        <small className="me-2 d-flex align-items-center text-body-secondary">
                          <Tag className="me-1" />
                          <div
                            dangerouslySetInnerHTML={{ __html: content.type }}
                          />
                        </small>
                      </div>
                    </div>
                  </Row>
                  <Row></Row>
                </Container>
              </Link>
            ))
          : router.query.term &&
            router.query.term[0] !== "" && (
              <Container fluid className="text-center mb-3 p-3">
                <Row>
                  <div className="col-12 text-body-primary">
                    <h5>{translate("page.search.noResults")}</h5>
                  </div>
                </Row>
              </Container>
            )}
      </Container>
      <FooterNavigation />
    </>
  );
}

export async function getServerSideProps(context) {
  // If term is not provided, default to an empty string
  const searchTerm = context.query.term
    ? context.query.term[0]
    : "Your default search term here";

  const resPages = await fetch(
    backendUrl + `wp-json/wp/v2/pages?per_page=100&search=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const pages = await resPages.json();

  const res = await fetch(
    backendUrl + `wp-json/wp/v2/posts?per_page=100&search=${searchTerm}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const posts = await res.json();

  //reduce the objects content
  let content = [];
  pages.forEach((page) => {
    content.push({
      id: page.id,
      type: "page",
      title: page.title.rendered,
      lang: "de + en",
      slug: page.slug,
      excerpt: page.excerpt.rendered,
      image: "/images/screenshot.jpg",
    });
  });

  posts.forEach((post) => {
    if (post.featured_image_url === false) {
      post.featured_image_url = "/images/screenshot.jpg";
    }
    content.push({
      id: post.id,
      type: "posts",
      title: post.title.rendered,
      lang: post.lang,
      slug: post.slug,
      excerpt: post.excerpt.rendered,
      image: post.featured_image_url,
    });
  });

  //sort by title
  content.sort((a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      content,
    },
  };
}
