import { useEffect, useMemo, useState } from "react";
import {
  Container, Row, Col, Card, ListGroup, Badge, Button,
  Table, Form, InputGroup
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";


export default function UserPanel() {
  const navigate = useNavigate();
  const [active, setActive] = useState("overview");
  const [showPwd, setShowPwd] = useState(false);


  // Mock: session
  const user = useMemo(() => JSON.parse(localStorage.getItem("user") || "{}"), []);
  const token = localStorage.getItem("token");


  useEffect(() => {
    if (!token || user?.role !== "user") {
      navigate("/login", { replace: true });
    }
  }, [navigate, token, user?.role]);


  // Mock data (replace with your API later)
  const stats = [
    { label: "Orders", value: 3 },
    { label: "Returns", value: 1 },
    { label: "Coupons", value: 2 },
    { label: "Points", value: 1200 },
  ];


  const recentOrders = [
    { id: "NGX-00123", date: "2025-09-10", total: 159.99, status: "Shipped" },
    { id: "NGX-00112", date: "2025-08-28", total: 79.5, status: "Delivered" },
    { id: "NGX-00097", date: "2025-08-06", total: 199.0, status: "Cancelled" },
  ];


  const wishlist = [
    { id: "w1", name: "PPF Gloss 60\"", price: 249.99, img: "/images/sample1.jpg" },
    { id: "w2", name: "PPF Matte 24\"", price: 119.00, img: "/images/sample2.jpg" },
    { id: "w3", name: "Blackout Vinyl", price: 39.90, img: "/images/sample3.jpg" },
  ];


  const addresses = [
    { id: "a1", label: "Home", name: "Jessica Perez", line1: "1234 Cabildo Ave", city: "Buenos Aires", zip: "1426", phone: "11-5555-5555", default: true },
    { id: "a2", label: "Work", name: "Jessica Perez", line1: "Martínez 500", city: "San Isidro", zip: "1642", phone: "11-4444-4444" },
  ];


  const coupons = [
    { code: "WELCOME10", desc: "10% OFF first purchase", expires: "2025-12-31" },
    { code: "NG-PPF-20", desc: "$20 OFF on PPF", expires: "2025-10-15" },
  ];


  const SectionTitle = ({ children, right }) => (
    <div className="d-flex justify-content-between align-items-center mb-3">
      <h5 className="mb-0">{children}</h5>
      {right}
    </div>
  );


  // Sections
  const Overview = () => (
    <>
      <SectionTitle right={<span className="text-muted">Hello, <b>{user?.email}</b></span>}>
        Overview
      </SectionTitle>


      <Row className="g-3">
        {stats.map((s) => (
          <Col key={s.label} xs={6} md={3}>
            <Card className="h-100 shadow-sm">
              <Card.Body className="text-center">
                <div className="fs-4 fw-bold">{s.value}</div>
                <div className="text-muted">{s.label}</div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


      <Card className="mt-4 shadow-sm">
        <Card.Body>
          <SectionTitle right={<Link to="/shop" className="small">Go to shop</Link>}>
            Recent Orders
          </SectionTitle>
          <Table striped hover responsive className="mb-0">
            <thead>
              <tr>
                <th>Order #</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.date}</td>
                  <td>${o.total}</td>
                  <td>
                    <Badge bg={
                      o.status === "Delivered" ? "success" :
                      o.status === "Shipped" ? "primary" :
                      "secondary"
                    }>
                      {o.status}
                    </Badge>
                  </td>
                  <td className="text-end">
                    <Button size="sm" variant="outline-secondary">View</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </>
  );


  const Orders = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <SectionTitle>My Orders</SectionTitle>
        <Table striped hover responsive className="mb-0">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Date</th>
              <th>Method</th>
              <th>Total</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.date}</td>
                <td>Card</td>
                <td>${o.total}</td>
                <td>
                  <Badge bg={
                    o.status === "Delivered" ? "success" :
                    o.status === "Shipped" ? "primary" : "secondary"
                  }>
                    {o.status}
                  </Badge>
                </td>
                <td className="text-end">
                  <Button size="sm" variant="outline-secondary">Details</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );


  const WishList = () => (
    <>
      <SectionTitle right={<Link to="/shop" className="small">Browse more</Link>}>
        Wishlist
      </SectionTitle>
      <Row className="g-3">
        {wishlist.map((p) => (
          <Col key={p.id} xs={12} sm={6} md={4}>
            <Card className="h-100 shadow-sm">
              <div style={{ aspectRatio: "1.3/1", background:"#f8f9fa" }}>
                {/* Replace with <img src={p.img} alt={p.name} className="w-100 h-100"/> */}
              </div>
              <Card.Body>
                <Card.Title className="fs-6 mb-1">{p.name}</Card.Title>
                <div className="text-muted mb-2">${p.price}</div>
                <div className="d-flex gap-2">
                  <Button size="sm" variant="outline-dark">Add to cart</Button>
                  <Button size="sm" variant="outline-danger">Remove</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );


  const Addresses = () => (
    <>
      <SectionTitle right={<Button size="sm" variant="outline-dark">Add new address</Button>}>
        Addresses
      </SectionTitle>
      <Row className="g-3">
        {addresses.map((a) => (
          <Col key={a.id} xs={12} md={6}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-start mb-1">
                  <Card.Title className="fs-6 mb-0">{a.label}</Card.Title>
                  {a.default && <Badge bg="dark">Default</Badge>}
                </div>
                <div className="text-muted small">
                  {a.name}<br/>
                  {a.line1}<br/>
                  {a.city} ({a.zip})<br/>
                  {a.phone}
                </div>
                <div className="d-flex gap-2 mt-3">
                  <Button size="sm" variant="outline-secondary">Edit</Button>
                  <Button size="sm" variant="outline-danger">Delete</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );


  const Coupons = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <SectionTitle>Coupons</SectionTitle>
        <ListGroup variant="flush">
          {coupons.map((c) => (
            <ListGroup.Item key={c.code} className="d-flex justify-content-between align-items-center">
              <div>
                <div className="fw-semibold">{c.code}</div>
                <small className="text-muted">{c.desc}</small>
              </div>
              <small className="text-muted">Expires: {c.expires}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );


  const Returns = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <SectionTitle>Returns</SectionTitle>
        <p className="text-muted mb-3">You don’t have any active returns.</p>
        <Button variant="outline-dark" size="sm">Start return</Button>
      </Card.Body>
    </Card>
  );


  const Support = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <SectionTitle>Support</SectionTitle>
        <p className="text-muted">Need help with an order, shipping or payment?</p>
        <Button variant="outline-dark" size="sm">Create ticket</Button>
      </Card.Body>
    </Card>
  );


  const Settings = () => (
    <Card className="shadow-sm">
      <Card.Body>
        <SectionTitle>Account Settings</SectionTitle>
        <Form>
          <Row className="g-3">
            <Col md={6}>
              <Form.Group controlId="setName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Your name" defaultValue="Jessica" />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="setEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="Email" defaultValue={user?.email} />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="setPwd">
                <Form.Label>New password</Form.Label>
                <InputGroup>
                  <Form.Control type={showPwd ? "text" : "password"} placeholder="••••••••" />
                  <Button variant="outline-secondary" onClick={() => setShowPwd(s => !s)}>
                    {showPwd ? <FaEyeSlash/> : <FaEye/>}
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="setPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" placeholder="11-5555-5555" />
              </Form.Group>
            </Col>
            <Col xs={12}>
              <Button variant="outline-danger">Save changes</Button>
            </Col>
          </Row>
        </Form>
      </Card.Body>
    </Card>
  );


  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    navigate("/login", { replace: true });
  };


  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      <Row className="g-4">
        {/* Sidebar */}
        <Col xs={12} md={4} lg={3}>
          <Card className="shadow-sm">
            <Card.Body>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="rounded-circle bg-dark" style={{ width: 48, height: 48 }} />
                <div>
                  <div className="fw-semibold">{user?.email || "User"}</div>
                  <small className="text-muted">My Account</small>
                </div>
              </div>


              <ListGroup variant="flush">
                <ListGroup.Item action active={active==="overview"} onClick={()=>setActive("overview")}>Overview</ListGroup.Item>
                <ListGroup.Item action active={active==="orders"} onClick={()=>setActive("orders")}>Orders</ListGroup.Item>
                <ListGroup.Item action active={active==="wishlist"} onClick={()=>setActive("wishlist")}>Wishlist</ListGroup.Item>
                <ListGroup.Item action active={active==="addresses"} onClick={()=>setActive("addresses")}>Addresses</ListGroup.Item>
                <ListGroup.Item action active={active==="coupons"} onClick={()=>setActive("coupons")}>Coupons</ListGroup.Item>
                <ListGroup.Item action active={active==="returns"} onClick={()=>setActive("returns")}>Returns</ListGroup.Item>
                <ListGroup.Item action active={active==="support"} onClick={()=>setActive("support")}>Support</ListGroup.Item>
                <ListGroup.Item action active={active==="settings"} onClick={()=>setActive("settings")}>Settings</ListGroup.Item>
              </ListGroup>


              <div className="d-grid mt-3">
                <Button variant="outline-secondary" onClick={onLogout}>Log out</Button>
              </div>
            </Card.Body>
          </Card>
        </Col>


        {/* Content */}
        <Col xs={12} md={8} lg={9}>
          {active === "overview" && <Overview/>}
          {active === "orders" && <Orders/>}
          {active === "wishlist" && <WishList/>}
          {active === "addresses" && <Addresses/>}
          {active === "coupons" && <Coupons/>}
          {active === "returns" && <Returns/>}
          {active === "support" && <Support/>}
          {active === "settings" && <Settings/>}
        </Col>
      </Row>
    </Container>
  );
}
