import { useEffect, useMemo, useState } from "react";
import {
  Container, Row, Col, Card, Form, Button, Table, Alert, Modal
} from "react-bootstrap";
import catalog from "../data/catalog.json";


const CATS = {
  "architectural": ["clear-security", "exterior-window"],
  "automotive-protection": ["ppf-color", "ppf-premium", "ppf-ultra"],
  "automotive-window": ["chameleon", "chip-dyed", "nano-carbon", "nano-ceramic"],
};


const EXTRA_KEY = "catalogExtras";
const DEFAULT_IMAGE = "/images/testingImg.jpg"; // <-- tu imagen por defecto


export default function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [msg, setMsg] = useState("");


  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "architectural",
    subcategory: "clear-security",
  });


  const [showEdit, setShowEdit] = useState(false);
  const [edit, setEdit] = useState(null);


  // Aplana JSON base
  const flattenFromCatalog = () => {
    const out = [];
    for (const catKey of Object.keys(catalog)) {
      for (const subKey of Object.keys(catalog[catKey])) {
        for (const p of catalog[catKey][subKey]) {
          out.push({
            // id existe internamente pero NO se muestra
            id: Number(p.id),
            name: p.title,
            price: Number(p.price),
            stock: Number(p.stock ?? 0),
            image: p.image || DEFAULT_IMAGE,
            category: catKey,
            subcategory: subKey,
            origin: "catalog",
          });
        }
      }
    }
    return out;
  };


  useEffect(() => {
    const base = flattenFromCatalog();
    const extras = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
    setProducts([...base, ...extras]);
  }, []);


  // Siguiente ID (interno, no visible)
  const nextId = useMemo(
    () => products.reduce((m, p) => Math.max(m, Number(p.id) || 0), 0) + 1,
    [products]
  );


  // Form handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "category") {
      setForm((prev) => ({ ...prev, subcategory: CATS[value][0] }));
    }
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    setMsg("");


    if (!form.name || !form.price) {
      setMsg("Name and price are required.");
      return;
    }


    // Siempre usamos la imagen por defecto
    const newP = {
      id: nextId, // no se muestra, solo para clave interna
      name: form.name,
      price: parseFloat(form.price),
      stock: parseInt(form.stock || 0, 10),
      image: DEFAULT_IMAGE,
      category: form.category,
      subcategory: form.subcategory,
      origin: "added",
    };


    const base = products.filter((p) => p.origin !== "added");
    const stored = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
    const updatedExtras = [newP, ...stored];
    localStorage.setItem(EXTRA_KEY, JSON.stringify(updatedExtras));
    setProducts([...base, ...updatedExtras]);


    setForm({ name: "", price: "", stock: "", category: form.category, subcategory: form.subcategory });
    setMsg("Added! Using default image.");
  };


  // Edit
  const openEdit = (p) => {
    setEdit({ ...p });
    setShowEdit(true);
  };


  const saveEdit = () => {
    if (!edit) return;
    const updated = products.map((p) =>
      p.id === edit.id
        ? {
            ...p,
            ...edit,
            image: edit.image || DEFAULT_IMAGE, // por si limpian el campo en algún momento
            origin: p.origin === "catalog" ? "added" : p.origin,
          }
        : p
    );
    setProducts(updated);
    const extras = updated.filter((x) => x.origin === "added");
    localStorage.setItem(EXTRA_KEY, JSON.stringify(extras));
    setShowEdit(false);
  };


  // Delete
  const handleDelete = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    const extras = updated.filter((x) => x.origin === "added");
    localStorage.setItem(EXTRA_KEY, JSON.stringify(extras));
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
              {msg && <Alert variant="info">{msg}</Alert>}


              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col md={4}>
                    <Form.Group controlId="formName">
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="PPF Ultra 10mil"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group controlId="formPrice">
                      <Form.Label>Price (USD)</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        placeholder="2000"
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


                  <Col md={6}>
                    <Form.Group controlId="formCategory">
                      <Form.Label>Category</Form.Label>
                      <Form.Select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                      >
                        {Object.keys(CATS).map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>


                  <Col md={6}>
                    <Form.Group controlId="formSubcategory">
                      <Form.Label>Subcategory</Form.Label>
                      <Form.Select
                        name="subcategory"
                        value={form.subcategory}
                        onChange={handleChange}
                      >
                        {CATS[form.category].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </Form.Select>
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
                <p className="text-muted">There are no products</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Name</th>
                      <th>Category / Sub</th>
                      <th>Price</th>
                      <th>Stock</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((p) => (
                      <tr key={`${p.origin}-${p.id}`}>
                        <td>
                          <img
                            src={p.image || DEFAULT_IMAGE}
                            alt={p.name}
                            style={{ width: 64, height: 64, objectFit: "cover", borderRadius: 6 }}
                            onError={(e) => { e.currentTarget.src = DEFAULT_IMAGE; }}
                          />
                        </td>
                        <td>{p.name}</td>
                        <td>{p.category} / {p.subcategory}</td>
                        <td>${Number(p.price).toLocaleString()}</td>
                        <td>{p.stock}</td>
                        <td className="d-flex gap-2">
                          <Button size="sm" variant="secondary" onClick={() => openEdit(p)}>
                            Edit
                          </Button>
                          <Button size="sm" variant="danger" onClick={() => handleDelete(p.id)}>
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


      {/* Modal Edit */}
      <Modal show={showEdit} onHide={() => setShowEdit(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {edit && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={edit.name}
                  onChange={(e) => setEdit((prev) => ({ ...prev, name: e.target.value }))}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Price (USD)</Form.Label>
                <Form.Control
                  type="number"
                  value={edit.price}
                  onChange={(e) => setEdit((prev) => ({ ...prev, price: Number(e.target.value) }))}
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={edit.stock}
                  onChange={(e) => setEdit((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group>
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      value={edit.category}
                      onChange={(e) => {
                        const cat = e.target.value;
                        setEdit((prev) => ({ ...prev, category: cat, subcategory: CATS[cat][0] }));
                      }}
                    >
                      {Object.keys(CATS).map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group>
                    <Form.Label>Subcategory</Form.Label>
                    <Form.Select
                      value={edit.subcategory}
                      onChange={(e) => setEdit((prev) => ({ ...prev, subcategory: e.target.value }))}
                    >
                      {CATS[edit.category].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
              {/* Sin campo de imagen: siempre usamos DEFAULT_IMAGE */}
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEdit(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveEdit}>Save</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
