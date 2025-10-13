import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PasswordToggleInput from "../sections/login/PasswordToggleInput";
// import Banner from "../components/Home/Banner";


// ⚙️ Variables de entorno (Vite)
const ADMIN_EMAIL = "admin@nexgenppf.com";
const ADMIN_PASS  = "panel12345";
const USER_EMAIL  = "user@nexgenppf.com";
const USER_PASS   = "12345";



export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const logoutTimer = useRef(null);


  const safeParse = (key) => {
    try {
      return JSON.parse(localStorage.getItem(key) || "null");
    } catch {
      return null;
    }
  };


  const doLogout = (notify = true) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("expiresAt");
    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    if (notify) alert("La sesión expiró. Iniciá sesión nuevamente.");
    navigate("/login");
  };


  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = safeParse("user") || {};
    const expiresAt = Number(localStorage.getItem("expiresAt") || 0);


    if (token && Date.now() < expiresAt) {
      if (user.role === "admin") navigate("/admin");
      else if (user.role === "user") navigate("/user");


      const msLeft = expiresAt - Date.now();
      logoutTimer.current = setTimeout(() => doLogout(), msLeft);
    } else {
      doLogout(false);
    }


    const onStorage = (e) => {
      if (e.key === "expiresAt" || e.key === "token") {
        const ok =
          localStorage.getItem("token") &&
          Date.now() < Number(localStorage.getItem("expiresAt") || 0);
        if (!ok) doLogout(false);
      }
    };


    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
      if (logoutTimer.current) clearTimeout(logoutTimer.current);
    };
  }, [navigate]);


  const handleLogin = (e) => {
    e.preventDefault();
    setErrMsg("");


    const matchAdmin = email === ADMIN_EMAIL && password === ADMIN_PASS;
    const matchUser = email === USER_EMAIL && password === USER_PASS;


    if (!matchAdmin && !matchUser) {
      setErrMsg("Correo o contraseña incorrectos");
      return;
    }


    const role = matchAdmin ? "admin" : "user";
    const expiresAt = Date.now() + 10 * 1000; // 🔥 Sesión de 10 segundos


    localStorage.setItem("token", `mock-${role}-token`);
    localStorage.setItem("user", JSON.stringify({ email, role }));
    localStorage.setItem("expiresAt", String(expiresAt));


    if (logoutTimer.current) clearTimeout(logoutTimer.current);
    logoutTimer.current = setTimeout(() => doLogout(), 10 * 1000);


    navigate(role === "admin" ? "/admin" : "/user");
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
                
                <Link className="text-danger fw-semibold" to="/under-construction">
                  Register
                </Link>
                <p>admin@nexgenppf.com = panel12345
                user@nexgenppf.com = 12345</p>
                
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
                  <Link to="/forgot-password" className="text-muted small">
                    Reset your password
                  </Link>
                </div>


                <div className="d-grid">
                  <Button type="submit" variant="outline-danger">
                    Login
                  </Button>
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
