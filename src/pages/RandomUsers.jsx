// src/pages/RandomUsers.jsx
import { Card, Container } from "react-bootstrap";
import UserCard from "../components/User/UserCard.jsx";
import CargarBotonDeUsuario from "../components/User/CargarBotonDeUsuario.jsx";


export default function RandomUsers() {
  return (
    <Container className="py-5" style={{ maxWidth: 720, marginTop: "5rem" }}>
      <Card className="shadow-sm">
        <Card.Body>
          <h2 className="fw-bold text-center mb-3">
            Random <span className="text-danger">Users</span>
          </h2>


          {/* Card del usuario */}
          <UserCard />


          {/* Botón para pedir uno nuevo */}
          <div className="text-center mt-3">
            <CargarBotonDeUsuario />
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}
