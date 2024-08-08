import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Search as SearchIcon } from "react-bootstrap-icons";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import styles from "./index.module.css";
import ColorToggleLink from "../color-toggle-link";
import { useState, useRef } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

export default function TopNavigation() {
  const router = useRouter();
  const isActive = (pathname) => (router.pathname === pathname ? "active" : "");
  const [showPopoverBacktoHome, setShowPopoverBacktoHome] = useState(false);
  const targetPopoverBacktoHome = useRef(null);
  const [showPopoverSearch, setShowPopoverSearch] = useState(false);
  const targetPopoverSearch = useRef(null);
  const togglePopoverSearch = () => setShowPopoverSearch((prev) => !prev);
  const togglePopoverBacktoHome = () => setShowPopoverBacktoHome((prev) => !prev);
  return (
    <div className={styles.wrapper}>
      <Navbar
        collapseOnSelect
        expand="sm"
        fixed="top"
        className={styles.navbar + " shadow-sm "}
      >
        <Container fluid="xl">
          <Link
            className="nav-link d-flex"
            href="/"
            aria-label="Back to Home"
            ref={targetPopoverBacktoHome}
            onMouseEnter={togglePopoverBacktoHome}
            onMouseLeave={togglePopoverBacktoHome}
          >
            <Image
              src="/images/n.png"
              alt="n Logo small"
              width={44}
              height={44}
            />

            <Navbar.Brand className="d-none d-md-block me-auto">
              iklas-stephan.de
            </Navbar.Brand>
          </Link>
          <Overlay
            target={targetPopoverBacktoHome.current}
            show={showPopoverBacktoHome}
            placement="bottom"
          >
            {(props) => (
              <Tooltip {...props}>
               Zurück zur Startseite
              </Tooltip>
            )}
          </Overlay>

          <div className="ms-auto d-flex order-sm-1">
            <div className="ms-sm-4"></div>
            <ColorToggleLink />
            <Link
              href="/search"
              className={`nav-link ${isActive("/search")}`}
              ref={targetPopoverSearch}
              onMouseEnter={togglePopoverSearch}
              onMouseLeave={togglePopoverSearch}
              aria-label="Search"
            >
              <SearchIcon className="mx-4 mx-sm-2" />
            </Link>
            <Overlay
              target={targetPopoverSearch.current}
              show={showPopoverSearch}
              placement="bottom"
            >
              {(props) => (
                <Tooltip {...props}>
                  Suche
                </Tooltip>
              )}
            </Overlay>
          </div>
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 px-1"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Link href="/" className={`nav-link ${isActive("/")}`}>
                Home
              </Link>
              <Link href="/blog" className={`nav-link ${isActive("/blog")}`}>
               Projekte
              </Link>
              <Link
                href="/#contactsection"
                className={`nav-link ${isActive("/#contactsection")}`}
              >
                Kontakt
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}