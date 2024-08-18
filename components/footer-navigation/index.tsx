import Link from "next/link";
import Image from "next/image";
import Container from "react-bootstrap/Container";
import { useRouter } from "next/router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Heart as HeartIcon, CodeSlash as CodeSlashIcon } from "react-bootstrap-icons";


export default function FooterNavigation() {
  const router = useRouter();
  const isActive = (pathname) => (router.pathname === pathname ? "active" : "");
  return (
    <Container fluid="xl" className="py-5 text-center mt-5">
      <Row>
        <Col className="d-flex justify-content-center">
          <Link href="/" className={`${isActive("/")} me-1 mx-lg-2 nav-link`}>
            Home
          </Link>
          |
          <Link href="/blog" className={`nav-link me-1 mx-lg-2 ${isActive("/blog")}`}>
            Projekte & Blog
          </Link>
          |
          <Link
            href="/page/privacy"
            className={`${isActive("/privacy")} nav-link me-1 mx-lg-2`}
          >
              Datenschutzerklärung
          </Link>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Link className="navbar-brand" href="/">
            <Image
              src="/images/n.png"
              alt="n Logo"
              className="d-inline-block me-1"
              width={48}
              height={48}
            />
            iklas-stephan.de
          </Link>
        </Col>
      </Row>
      <Row>
        <Col className="mt-5">
          <small>
            {" "}
            made with
            <HeartIcon className="text-primary mx-2" />
            and
            <CodeSlashIcon className="text-info mx-2" />
            by Niklas Stephan in 2024
          </small>
        </Col>
        
      </Row>
    </Container>
  );
}


