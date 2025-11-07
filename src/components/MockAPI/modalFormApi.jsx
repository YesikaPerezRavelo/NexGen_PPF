import React from "react";
import { Button, Form, Modal } from "react-bootstrap";


export default function ProductoFormModal({
  show,
  onClose,
  onSubmit,
  form,
  setForm,
  editId,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price || 0),
      stock: Number(form.stock || 0),
    };
    await onSubmit(payload);
    onClose();
  };


  return (
    <Modal show={show} onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Editar producto" : "Nuevo producto"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Título</Form.Label>
            <Form.Control name="title" value={form.title} onChange={handleChange} required />
          </Form.Group>


          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={form.description} onChange={handleChange}/>
          </Form.Group>


          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control type="number" step="0.01" min="0" name="price" value={form.price} onChange={handleChange} required/>
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control type="number" min="0" name="stock" value={form.stock} onChange={handleChange} required/>
              </Form.Group>
            </div>
          </div>


          <Form.Group className="mb-2">
            <Form.Label>URL de imagen</Form.Label>
            <Form.Control name="image" value={form.image} onChange={handleChange} placeholder="https://..." />
          </Form.Group>


          {form.image && (
            <div className="text-center">
              <img
                src={form.image}
                alt="preview"
                style={{ maxWidth: "100%", maxHeight: 180, objectFit: "contain" }}
                onError={(e) => (e.currentTarget.style.display = "none")}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button type="submit">{editId ? "Guardar cambios" : "Crear"}</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
