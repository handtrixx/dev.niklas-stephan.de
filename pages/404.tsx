import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { DefaultSeo } from 'next-seo';
import TopNavigation from "../components/top-navigation";
import FooterNavigation from "../components/footer-navigation";
import { useMemo } from 'react';

export default function Custom404() {
  const router = useRouter();
  const term = useMemo(() => {
    const lastPath = router.asPath.split('/').pop();
    return lastPath || 'MySearch';
  }, [router.asPath]);

  const pageTitle = "page.search.head.title";
  const pageDescription = "page.search.head.description";

  return (
    <>
      <TopNavigation />
      <Container fluid="lg" className="my-5">
        <Row>
          <Col className="text-center mt-5">
            <h1>404 - Ups!</h1>
            <p className="mt-4">Die Seite, die du suchst, wurde nicht gefunden.</p>
            <Link  href={`/search/${term}`}>
                <div className="btn btn-primary mt-5 fingerpaint">
                  Suche
                </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <FooterNavigation />
    </>
  );
}