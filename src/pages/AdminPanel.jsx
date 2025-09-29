import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Table } from "react-bootstrap";


export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", stock: "" });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;


    const newProduct = {
      id: crypto.randomUUID(),
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || 0),
    };


    setProducts((prev) => [...prev, newProduct]);
    setForm({ name: "", price: "", stock: "" });
  };


  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };


  return (
    <Container className="py-5" style={{ marginTop: "5rem" }}>
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          <h2 className="fw-bold text-center mb-4">
            Admin <span className="text-danger">Panel</span>
          </h2>


          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <h5 className="mb-3">New product</h5>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Ej: Protector PPF"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>


                  <Col md={4}>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="100"
                        value={form.price}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>


                  <Col md={4}>
                    <Form.Group controlId="formStock">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        placeholder="10"
                        value={form.stock}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  </Col>
                </Row>


                <div className="text-center mt-4">
                  <Button type="submit" variant="outline-danger">
                    Save Product
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>


          <Card className="shadow-sm">
            <Card.Body>
              <h5 className="mb-3">List of products</h5>
              {products.length === 0 ? (
                <p className="text-muted">There are no products created</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>${p.price}</td>
                        <td>{p.stock}</td>
                        <td>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => handleDelete(p.id)}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
