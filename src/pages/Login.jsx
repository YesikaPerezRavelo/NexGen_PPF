import { useState } from "react";
import { Container, Card, Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import DynamicBackground from "../components/DynamicBackground";
import { Helmet } from "react-helmet-async";  // 👈 Helmet agregado


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();


  const backgrounds = [
    "/images/boats.jpg",
    "/images/building.jpg",
    "/images/car.jpg",
  ];


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      await login(email, password);


      // 👉 Obtener el usuario desde localStorage
      const user = JSON.parse(localStorage.getItem("user") || "{}");


      // ✅ Redirigir según el rol
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "user") {
        navigate("/user");
      } else {
        navigate("/"); // fallback
      }
    } catch (e2) {
      setErr(e2.message || "Error al iniciar sesión");
    }
  };


  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Login | NexGenPPF</title>
        <meta
          name="description"
          content="Iniciá sesión para acceder al portal de NexGen PPF. Administra y consulta productos de película de protección (PPF) premium para autos, edificios y embarcaciones."
        />
        <meta
          name="keywords"
          content="PPF, paint protection film, automotive protection, building film, boat protection, NexGen PPF, login"
        />
      </Helmet>


      <DynamicBackground images={backgrounds} interval={4000}>
        <Container className="py-5" style={{ maxWidth: 520 }}>
          <Card className="shadow-sm">
            <Card.Body>
              <h3 className="mb-3 text-center">Iniciar sesión</h3>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    type="email"
                    placeholder="Correo electrónico"
                  />
                </Form.Group>


                <Form.Group className="mb-3">
                  <Form.Label>Contraseña</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={show ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña *"
                      required
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShow((s) => !s)}
                      aria-label={show ? "Ocultar contraseña" : "Mostrar contraseña"}
                    >
                      {show ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                  </InputGroup>
                </Form.Group>


                <Button
                  type="submit"
                  variant="outline-dark"
                  className="w-50 border-100 d-block mx-auto rounded-3"
                >
                  Entrar
                </Button>
              </Form>


              {err && (
                <Alert className="mt-3" variant="danger">
                  {err}
                </Alert>
              )}


              <div className="mt-3 small text-muted text-center">
                admin@nexgenppf.com / panel12345<br />
                user@nexgenppf.com / 12345
              </div>
            </Card.Body>
          </Card>
        </Container>
      </DynamicBackground>
    </>
  );
}
