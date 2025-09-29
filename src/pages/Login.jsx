// ...imports
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import PasswordToggleInput from "../sections/login/PasswordToggleInput";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const expiresAt = Number(localStorage.getItem("expiresAt") || 0);


    if (token && Date.now() < expiresAt) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "user") navigate("/user");
    } else {
    
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("expiresAt");
    }
  }, [navigate]);


  const handleLogin = (e) => {
    e.preventDefault();
    setErrMsg("");



    const TEN_SECONDS = 10 * 1000;
    const expiresAt = Date.now() + TEN_SECONDS;


    if (email === "admin@nexgenppf.com" && password === "panel12345") {
      localStorage.setItem("token", "mock-admin-token");
      localStorage.setItem("user", JSON.stringify({ email, role: "admin" }));
      localStorage.setItem("expiresAt", String(expiresAt));
      return navigate("/admin");
    }


    if (email === "user@nexgenppf.com" && password === "12345") {
      localStorage.setItem("token", "mock-user-token");
      localStorage.setItem("user", JSON.stringify({ email, role: "user" }));
      localStorage.setItem("expiresAt", String(expiresAt));
      return navigate("/user");
    }


    setErrMsg("Correo o contraseña incorrectos");
  };


  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={8} lg={5}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="fw-bold text-center mb-3">
                Please<span className="text-danger">Login</span>
              </h2>


              <p className="text-center mb-4">
                Don't have an account?{" "}
                <Link className="text-danger fw-semibold" to="/registro">Register</Link>
              </p>


              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Email address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>


                <Form.Group className="mb-2" controlId="loginPassword">
                  <Form.Label>Password</Form.Label>
                  <PasswordToggleInput
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password *"
                  />
                </Form.Group>


                <div className="mb-3">
                  <Link to="/forgot-password" className="text-muted small">Reset your password</Link>
                </div>


                <div className="d-grid">
                  <Button type="submit" variant="outline-danger">Login</Button>
                </div>
              </Form>


              {errMsg && <Alert variant="danger" className="mt-3">{errMsg}</Alert>}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
