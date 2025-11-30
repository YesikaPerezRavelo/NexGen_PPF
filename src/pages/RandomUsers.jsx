import { Card, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import UserCard from "../components/User/UserCard.jsx";
import CargarBotonDeUsuario from "../components/User/CargarBotonDeUsuario.jsx";


export default function RandomUsers() {
  const navigate = useNavigate();


  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Users | NexGenPPF</title>
        <meta
          name="description"
          content="Generate and explore random user profiles for testing the NexGen PPF portal."
        />
      </Helmet>


      <Container className="py-5" style={{ maxWidth: 720, marginTop: "5rem" }}>
        <Card className="shadow-sm">
          <Card.Body>


            {/* 🔴 Admin button */}
            <div className="d-flex justify-content-end mb-3">
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => navigate("/admin")}
              >
                Go to Admin Panel
              </Button>
            </div>


            <h2 className="fw-bold text-center mb-3">
              Search <span className="text-danger">Users</span>
            </h2>


            <UserCard />


            <div className="text-center mt-3">
              <CargarBotonDeUsuario />
            </div>


          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
