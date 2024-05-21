import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticProps } from "next";
import Link from "next/link";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/Button";
import { CalendarWeekFill, Translate, Search } from "react-bootstrap-icons";
import { FormattedMessage, useIntl } from "react-intl";
import PostTeaser from "../../components/post-teaser";
import TopNavigation from "../../components/top-navigation";
import FooterNavigation from "../../components/footer-navigation";
import { NextSeo } from "next-seo";
import { frontendHost, frontendUrl, backendHost, backendUrl } from '../../utils/env.js';

export default function Index({ allPosts: { posts } }) {
  const intl = useIntl();
  const translate = (id) => intl.formatMessage({ id });
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

  const title = "Blog - "+frontendHost;
  const description = "Blog auf "+frontendHost;
  const pageurl = frontendUrl+"/blog";

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        openGraph={{
          url: pageurl,
          title: title,
          description: description
        }}
      />
      <TopNavigation />
      <Container fluid={"xl"}>
        <Row className="mb-4">
          <Col>
            <h1 >Blog.</h1>
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
                placeholder={translate("page.blog.button.filter")}
                aria-label="Username"
                aria-describedby="basic-addon1"
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
                  Desc
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setSortOrder("asc")}>
                  Asc
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
              <h4 className="mt-5">
                <FormattedMessage id="page.blog.noPostsFound" /> {filter}
              </h4>
              <h5 className="mt-5">
                <Link href={"/search/" + filter}>
                  <Button className="fingerpaint">
                    <FormattedMessage id="page.blog.searchLink" />
                  </Button>
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

export const getStaticProps: GetStaticProps = async () => {
  const allPosts = await getAllPostsForHome();
  return {
    props: { allPosts },
    revalidate: 10,
  };
};

async function getAllPostsForHome() {
  try {
    const res = await fetch(
      backendUrl+`/wp-json/wp/v2/posts?per_page=100`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const page = await res.json();

    const posts = await Promise.all(
      page.map(async (element) => {
       // console.log(frontendUrl+"images/screenshot.jpg");

        const imageUrl = element.featured_image_url;
        return {
          id: element.id,
          slug: element.slug,
          title: element.title.rendered,
          lang: element.lang,
          date: element.date,
          modified: element.modified,
          excerpt: element.excerpt.rendered,
          featured_media: element.featured_media,
          categories: element.categories,
          imageUrl: imageUrl,
          imageAlt: element.slug,
          imageWidth: 400,
          imageHeight: 400,
        };
      })
    );
    return { posts: posts };
  } catch (error) {
    console.error("Error fetching posts:", error);
    // You can decide how to handle the error here. For example, you might want to return an empty array of posts:
    return { posts: [] };
  }
}