import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function UnderConstruction() {
  return (
    <Container className="py-5 text-center">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
         
          <Image
            src="/images/underconstruction.jpg"
            alt="Página en construcción"
            fluid
            className="mb-4"
          />
          <h2 className="mb-3 text-secondary">Página en construcción</h2>
          <p className="mb-4">
            Estamos trabajando para que esta sección quede increíble. ¡Vuelve pronto!
          </p>
          <Button as={Link} to="/" className="btn btn-danger">
            Volver al inicio
          </Button>
        </Col>
      </Row>
    </Container>
  );
}
