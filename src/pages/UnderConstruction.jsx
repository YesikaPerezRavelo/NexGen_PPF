import { Container, Row, Col, Button } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";


export default function UnderConstruction() {
  return (
    <>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>Under Construction</title>
        <meta
          name="description"
          content="This section is currently under construction. Please check back soon."
        />
      </Helmet>


      <Container className="py-5 text-center" style={{ marginTop: "5rem" }}>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <Image
              src="/images/underconstruction.jpg"
              alt="Under construction"
              fluid
              className="mb-4"
            />


            <h2 className="mb-3 text-secondary">Page Under Construction</h2>


            <p className="mb-4">
              We are working to make this section amazing. Please check back soon!
            </p>


            <Button as={Link} to="/" className="btn btn-danger">
              Back to Home
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
