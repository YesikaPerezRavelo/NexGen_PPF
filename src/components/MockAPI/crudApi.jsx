import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useProductos } from "../../hooks/useProductsApi";
import ProductsTableMockAPI from "./tableApi";
import ProductFormModalMockAPI from "./modalFormApi";


export default function CrudProductos() {
  const { productos, loading, error, create, update, remove, EMPTY_FORM } = useProductos();


  const [show, setShow]     = useState(false);
  const [form, setForm]     = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);


  const openNew = () => { setForm(EMPTY_FORM); setEditId(null); setShow(true); };
  const openEdit = (p) => {
    setForm({
      title: p.title ?? "",
      description: p.description ?? "",
      price: Number(p.price ?? 0),
      stock: Number(p.stock ?? 0),
      image: p.image ?? "",
    });
    setEditId(p.id);
    setShow(true);
  };
  const close = () => setShow(false);


  const submit = async (payload) => {
    if (editId) await update(editId, payload);
    else await create(payload);
  };


  const onDelete = async (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este producto?")) await remove(id);
  };


  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3 className="m-0">Productos</h3>
        <Button onClick={openNew}>Nuevo producto</Button>
      </div>


      {error && <p className="text-danger">{error}</p>}
      {loading && <p>Cargando...</p>}


      <ProductsTableMockAPI items={productos} onEdit={openEdit} onDelete={onDelete} loading={loading} />


      <ProductFormModalMockAPI
        show={show}
        onClose={close}
        onSubmit={submit}
        form={form}
        setForm={setForm}
        editId={editId}
      />
    </>
  );
}




