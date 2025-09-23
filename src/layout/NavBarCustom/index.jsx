import { useState } from "react";
import { Navbar, Container, Nav, NavDropdown, Form, Button, Badge } from "react-bootstrap";
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


  return (
    <Navbar expand="lg" fixed="top" className="navbar-transparent" data-bs-theme="dark">
      <Container fluid className="px-4 px-md-5">
        <NavLink to="/" className="navbar-brand d-flex align-items-center">
          <img className="img-fluid" style={{ maxWidth: 180 }} src={logoSrc} alt={brand} />
        </NavLink>


        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
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


          <Form className="d-flex align-items-center gap-3" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center">
              <IoMdSearch size={iconSize} color={iconColor} className="me-2" />
              <Form.Control
                type="search"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button variant="outline-light" type="submit">Search</Button>


            <CiUser size={iconSize} color={iconColor} style={{ cursor: "pointer" }} />


            <div className="position-relative">
              <IoCartOutline size={iconSize} color={iconColor} />
              {cartCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </Badge>
              )}
            </div>


            <div className="position-relative ms-2">
              <IoHeartOutline size={iconSize} color={iconColor} />
              {favCount > 0 && (
                <Badge bg="danger" pill className="position-absolute top-0 start-100 translate-middle">
                  {favCount}
                </Badge>
              )}
            </div>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}