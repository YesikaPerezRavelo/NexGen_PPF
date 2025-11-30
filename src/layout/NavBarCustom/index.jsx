import { useState } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Form,
  Button,
  Badge,
} from "react-bootstrap";
import { IoMdSearch } from "react-icons/io";
import { CiUser } from "react-icons/ci";
import { IoCartOutline, IoHeartOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";


export default function NavBarCustom({
  logoSrc = "/images/LOGO.png",
  brand = "Mi Sitio",
  links = [],
  onSearchSubmit,
  cartCount = 0,
  favCount = 0,
  iconColor = "#fff",
  iconSize = 24,
}) {
  const [query, setQuery] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit?.(query);
  };


  // 👉 Links comunes para desktop y mobile
  const renderLinks = () => (
    <Nav className="me-auto my-2 my-lg-10" navbarScroll>
      {links.map((link, idx) =>
        link.dropdown ? (
          <NavDropdown title={link.title} id={`dropdown-${idx}`} key={idx}>
            {link.items.map((item, i) => (
              <NavDropdown.Item as={NavLink} to={item.href} key={i}>
                {item.label}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
        ) : (
          <Nav.Link as={NavLink} to={link.href} key={idx}>
            {link.label}
          </Nav.Link>
        )
      )}
    </Nav>
  );


  // 👉 Zona derecha (buscador + íconos), común para desktop y mobile
  const renderActions = () => (
    <Form
      className="d-flex flex-wrap align-items-center gap-3 mt-3 mt-lg-0"
      onSubmit={handleSubmit}
    >
      <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
        <IoMdSearch size={iconSize} color={iconColor} className="me-2" />
        <Form.Control
          type="search"
          placeholder="Search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>


      <Button variant="outline-light" type="submit">
        Search
      </Button>


      <NavLink to="/login" className="d-flex align-items-center">
        <CiUser size={iconSize} color={iconColor} style={{ cursor: "pointer" }} />
      </NavLink>


      <div className="position-relative">
        <NavLink
          to="/cart"
          className="position-relative d-inline-flex align-items-center"
        >
          <IoCartOutline size={iconSize} color={iconColor} />
          {cartCount > 0 && (
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ pointerEvents: "none" }}
            >
              {cartCount}
            </Badge>
          )}
        </NavLink>
      </div>


      <div className="position-relative ms-2">
        <NavLink
          to="/under-construction"
          className="d-flex align-items-center"
        >
          <IoHeartOutline
            size={iconSize}
            color={iconColor}
            style={{ cursor: "pointer" }}
          />
        </NavLink>


        {favCount > 0 && (
          <Badge
            bg="danger"
            pill
            className="position-absolute top-0 start-100 translate-middle"
          >
            {favCount}
          </Badge>
        )}
      </div>
    </Form>
  );


  return (
    <>
      {/* 🖥️ DESKTOP - lg y más grande */}
      <Navbar
        expand="lg"
        fixed="top"
        className="navbar-transparent d-none d-lg-flex"
        data-bs-theme="dark"
      >
        <Container fluid className="px-4 px-md-5">
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img
              className="img-fluid"
              style={{ maxWidth: 180 }}
              src={logoSrc}
              alt={brand}
            />
          </NavLink>


          <Navbar.Toggle aria-controls="navbarScrollDesktop" />
          <Navbar.Collapse id="navbarScrollDesktop">
            {renderLinks()}
            {renderActions()}
          </Navbar.Collapse>
        </Container>
      </Navbar>


      {/* 📱 MOBILE - menor a lg */}
      <Navbar
        expand="lg"
        className="bg-dark d-flex d-lg-none"
        data-bs-theme="dark"
      >
        <Container fluid className="px-3">
          <NavLink to="/" className="navbar-brand d-flex align-items-center">
            <img
              className="img-fluid"
              style={{ maxWidth: 150 }}
              src={logoSrc}
              alt={brand}
            />
          </NavLink>


          <Navbar.Toggle aria-controls="navbarScrollMobile" />
          {/* <Navbar.Collapse id="navbarScrollMobile">
            {renderLinks()}
            <div className="mt-3 w-100">{renderActions()}</div>
          </Navbar.Collapse> */}

          <Navbar.Collapse id="navbarScrollMobile">
  {/* 1️⃣ Primero: Search + user + carrito + likes */}
  <div className="mt-3 w-100">
    {renderActions()}
  </div>


  {/* 2️⃣ Después: About / Contact / Products */}
  <div className="mt-3">
    {renderLinks()}
  </div>
</Navbar.Collapse>

        </Container>
      </Navbar>
    </>
  );
}
