import Link from "next/link";
import Head from "next/head";
import { FormattedMessage, useIntl } from "react-intl";
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
  const intl = useIntl();
  const term = useMemo(() => {
    const lastPath = router.asPath.split('/').pop();
    return lastPath || 'MySearch';
  }, [router.asPath]);

  const translate = useMemo(() => {
    return (id) => intl.formatMessage({ id });
  }, [intl]);

  const pageTitle = translate("page.search.head.title");
  const pageDescription = translate("page.search.head.description");

  return (
    <>
      <TopNavigation />
      <Container fluid="lg" className="my-5">
        <Row>
          <Col className="text-center mt-5">
            <h1><FormattedMessage id="404.content.headline" /></h1>
            <p className="mt-4"><FormattedMessage id="404.content.text" /></p>
            <Link  href={`/search/${term}`}>
                <div className="btn btn-primary mt-5 fingerpaint">
                    <FormattedMessage id="404.content.search" />
                </div>
            </Link>
          </Col>
        </Row>
      </Container>
      <FooterNavigation />
    </>
  );
}