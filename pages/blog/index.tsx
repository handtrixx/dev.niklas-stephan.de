import { useEffect, useRef, useState, useMemo } from "react";
import { GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { NextSeo } from "next-seo";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import {
  CalendarWeekFill,
  Translate,
  Search,
  Bookmark,
  ChevronUp,
  ChevronDown,
} from "react-bootstrap-icons";
import { format } from "date-fns";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import env from "../../utils/env";
import styles from "./index.module.css";



export const getStaticProps: GetStaticProps = async () => {
  try {
    const res = await fetch(env.apiUrl + `/wp-json/babelnext/v1/posts`, {
      headers: {
        "Content-Type": "application/json",
        "Api-Token": env.apiToken,
      },
    });
    const page = await res.json();

    const posts = await Promise.all(
      page.map(async (element) => {
        return {
          slug: element.slug,
          title: element.title,
          lang: "en",
          date: element.date,
          modified: element.modified,
          excerpt: element.excerpt,
          categories: element.categories,
          imageUrl: element.imageUrl,
          imageAlt: element.slug,
          imageWidth: 400,
          imageHeight: 400,
        };
      })
    );
    return {
      props: { allPosts: { posts } },
      revalidate: 10,
    };
  } catch (error) {
    console.error("Error fetching posts:", error);
    return {
      props: { allPosts: { posts: [] } },
      revalidate: 10,
    };
  }
};

export default function Index({ allPosts: { posts } }) {
  const router = useRouter();
  // Add a state for the filter
  const [filter, setFilter] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  // Add a state for the filtered posts
  const [filteredPosts, setFilteredPosts] = useState(posts);

  // Update the filtered posts whenever the filter or the posts change
  useEffect(() => {
    let sortedPosts = [...posts];
    if (sortOrder === "asc") {
      sortedPosts.sort((a, b) =>
        new Date(a.date) > new Date(b.date) ? 1 : -1
      );
    } else if (sortOrder === "desc") {
      sortedPosts.sort((a, b) =>
        new Date(a.date) < new Date(b.date) ? 1 : -1
      );
    }

    setFilteredPosts(
      sortedPosts.filter(
        (post) =>
          (filter.length < 2 ||
            post.title.toLowerCase().includes(filter.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(filter.toLowerCase())) &&
          (languageFilter === "" || post.lang === languageFilter)
      )
    );
  }, [filter, languageFilter, sortOrder, posts]);
  const languageShow = languageFilter === "" ? "de+en" : languageFilter;
  const sortOrderShow = sortOrder === "" ? "desc" : sortOrder;
  const title = "Blog - " + env.frontendHost;
  const description = "Blog auf " + env.frontendHost;
  const pageurl = env.frontendUrl + "/blog";


 
  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: pageurl,
          title: title,
          description: description,
        }}
      />
      <TopNavigation />
      <Container fluid={"xl"}>
        <Row className="mb-4">
          <Col>
            <h1>Blog.</h1>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col xs={12} md={2} xl={3}></Col>
          <Col xs={12} md={8} xl={6}>
            <div className="input-group mb-3">
              <div className="form-label align-self-center">
                <Translate size={18} />
              </div>
              <DropdownButton
                variant="outline"
                title={languageShow}
                id="input-language-dropdown-1"
              >
                <Dropdown.Item onClick={() => setLanguageFilter("")}>
                  de+en
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguageFilter("de")}>
                  de
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setLanguageFilter("en")}>
                  en
                </Dropdown.Item>
              </DropdownButton>
              <div className="form-label align-self-center ms-2">
                <Search size={18} />
              </div>
              <input
                className="form-control form-control-search me-2"
                type="text"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Beiträge filtern"
                aria-label="filtern"
                aria-describedby="filter1"
              />
              <div className="form-label align-self-center">
                <CalendarWeekFill size={18} />
              </div>
              <DropdownButton
                variant="outline"
                title={sortOrderShow}
                id="input-sorting-dropdown-1"
              >
                <Dropdown.Item onClick={() => setSortOrder("desc")}>
                  desc
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder("asc")}>
                  asc
                </Dropdown.Item>
              </DropdownButton>
            </div>
          </Col>
          <Col xs={12} md={2} xl={3}></Col>
        </Row>
        <Row>
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post, index) => (         
              <PostTeaser key={index} post={post} />
            ))
          ) : (
            <Col className="text-center vh-100">
              <h4 className="mt-5">Keine Beiträge gefunden zu: {filter}</h4>
              <h5 className="mt-5">
                <Link href={"/search/" + filter}>
                  <Button className="fingerpaint">Starte Detailsuche</Button>
                </Link>
              </h5>
            </Col>
          )}
        </Row>
      </Container>
      <FooterNavigation />
    </>
  );
}



function PostTeaser({ post }) {

  const [isExpanded, setIsExpanded] = useState(false);
  const dateFormat = "dd.MM.yyyy";
  const postDate = useMemo(() => format(new Date(post.date), dateFormat), [post.date, dateFormat]);
  const toggleExpanded = () => setIsExpanded((prev) => !prev);

  return (
    <div key={post.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
      <div className="bg-light-subtle shadow-sm py-2">
        <div className="pb-3 px-2">
          <div className="container-fluid ">
            <Link href={`/posts/${post.slug}`} className="text-decoration-none">
              <div className="row">
                <div className="col-2 px-0">
                  <Bookmark className="fs-2 text-primary" />
                </div>
                <div className="col-10 px-0">
                  <span className="d-block text-body-primary" dangerouslySetInnerHTML={{ __html: post.title }} />
                </div>
              </div>
            </Link>
          </div>
        </div>

        <Link href={`/posts/${post.slug}`}>
          <div className={styles["image-wrapper"]}>
            {post.imageUrl ? (
              <Image
                src={post.imageUrl}
                alt={post.imageAlt}
                width={post.imageWidth}
                height={post.imageHeight}
                className={styles["image-blog"]}
              />
            ) : (
              <Image
                src="/images/n.png"
                alt="Logo niklas-stephan.de"
                width="150"
                height="150"
                className={styles["image-blog"]}
              />
            )}
          </div>
        </Link>
        <div className="pt-3 px-2">
          <div
            className={`text-body-secondary ${styles["excerpt"]} ${isExpanded ? styles["excerpt-expanded"] : ""}`}
            dangerouslySetInnerHTML={{ __html: post.excerpt }}
          />
          <div className="d-flex mt-2 align-items-center">
            <small className="mx-2 text-body-secondary">
              <Translate className="me-1" />
              {post.lang}
            </small>
            <small className="mx-2 text-body-secondary">
              <CalendarWeekFill className="me-1" />
              {postDate}
            </small>
            <div className="ms-auto btn btn-sm btn-outline-primary rounded-4 border-2" onClick={toggleExpanded}>
              {isExpanded ? <ChevronUp /> : <ChevronDown />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
