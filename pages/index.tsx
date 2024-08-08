import Link from "next/link";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  EnvelopeFill,
  Linkedin,
  ChevronDown,
  ChevronRight,
} from "react-bootstrap-icons";
import Head from "next/head";
import TopNavigation from "../components/top-navigation";
import FooterNavigation from "../components/footer-navigation";
import TreeCv from "../components/landing-page/tree-cv";
import TreeEducation from "../components/landing-page/tree-education";
import TreeProjects from "../components/landing-page/tree-projects";
import TreeTrivia from "../components/landing-page/tree-trivia";
import TreeHobbies from "../components/landing-page/tree-hobbies";

// Define constants for repeated strings
const TITLE_ID = "page.home.head.title";
const DESCRIPTION_ID = "page.home.head.description";
const rowClasses = "d-flex align-items-center justify-content-center";

// Create a reusable CustomImage component
const CustomImage = ({ src, alt, priority = false }) => (
  <Image
    src={src}
    alt={alt}
    width={512}
    height={512}
    className="img-fluid"
    priority={priority}
  />
);

export default function Page({ dir }) {

  return (
    <>
      <Head>
        <title>Title</title>
      </Head>

      <main dir={dir}>
        <Container fluid>
          <TopNavigation />
          <Container fluid="lg">
            <Row className={rowClasses + " fullscreen"}>
              <Col md={6} className="text-center">
                <CustomImage
                  src="/images/web_edit2.webp"
                  alt="Niklas Stephan"
                  priority
                />
              </Col>
              <Col md={6}>
                <div className="text-center">
                  <h1 className="display-1">NIKLAS STEPHAN</h1>
                  <h2 className="fs-3">Data Innovation Architect</h2>
                </div>
                <Container fluid className="text-center px-0">
                  <a
                    href="#cvsection"
                    title="Link zur CV von Niklas Stephan"
                    className="btn btn-lg btn-primary mt-4"
                  >
                    <ChevronDown />
                    <span className="ms-1 fingerpaint text-shadow">
                      Mehr über mich
                    </span>
                  </a>
                  <Link
                    href="/blog"
                    title="Link to Blog"
                    className="btn btn-lg btn-outline-primary mt-4 ms-2"
                  >
                    <ChevronRight />
                    <span className="ms-1 fingerpaint text-shadow">
                      Projekte
                    </span>
                  </Link>
                </Container>
              </Col>
            </Row>
          </Container>
          <Container fluid="lg">
            <Row className={rowClasses}>
              <Col id="cvsection" md={6} className="order-2 order-md-1">
                <TreeCv />
              </Col>
              <Col md={6} className="text-center order-1 order-md-2">
                <CustomImage src="/images/yingyang.webp" alt="CV" />
              </Col>
            </Row>
            <Row className={rowClasses}>
              <Col md={6} className="text-center">
                <CustomImage src="/images/edu_web.webp" alt="Education" />
              </Col>
              <Col md={6}>
                <TreeEducation />
              </Col>
            </Row>
            <Row className={rowClasses}>
              <Col md={6} className="order-2 order-md-1">
                <TreeProjects />
              </Col>
              <Col md={6} className="text-center order-1 order-md-2">
                <CustomImage src="/images/projects.webp" alt="Projects" />
              </Col>
            </Row>
            <Row className={rowClasses}>
              <Col md={6} className="order-2 order-md-2">
                <TreeTrivia />
              </Col>
              <Col md={6} className="text-center order-1 order-md-1">
                <CustomImage src="/images/vault_web.webp" alt="Trivia" />
              </Col>
            </Row>
            <Row className={rowClasses}>
              <Col md={6} className="text-center order-1 order-md-2">
                <CustomImage src="/images/hobbies_web.webp" alt="Hobbies" />
              </Col>
              <Col md={6} className="order-2 order-md-1">
                <TreeHobbies />
              </Col>
            </Row>
            <Row className={rowClasses}>
              <Col sm={{ span: 8 }} md={{ span: 6 }} id="contactsection">
                <div className="py-5">
                  <h1 className="display-1 text-center">
                   Kontakt
                  </h1>
                  <div className="card mt-5">
                    <div className="card-body pb-0">
                      <Container className="px-0">
                        <Row>
                          <Col className="col-4 px-0">
                            <CustomImage
                              src="/images/profile.webp"
                              alt="Niklas Stephan"
                            />
                          </Col>
                          <Col className="col-8">
                            <div className="fs-4 card-title">
                              Niklas Stephan
                            </div>
                            <p>Data Innovation Architect</p>

                            <p className="card-text pt-3">
                              <a
                                className="text-decoration-none"
                                href="mailto:
                                mail@niklas-stephan.de"
                              >
                                <EnvelopeFill />
                                <span className="ms-2">
                                  mail@niklas-stephan.de
                                </span>
                              </a>
                            </p>
                            <p>
                              <Link
                                href="https://linkedin.com/in/niklas-stephan/"
                                target="_blank"
                                className="text-decoration-none"
                              >
                                <Linkedin />
                                <span className="ms-2">
                                  linkedin.com/in/niklas-stephan
                                </span>
                              </Link>
                            </p>
                          </Col>
                        </Row>
                      </Container>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
            <FooterNavigation />
          </Container>
        </Container>
      </main>
    </>
  );
}
