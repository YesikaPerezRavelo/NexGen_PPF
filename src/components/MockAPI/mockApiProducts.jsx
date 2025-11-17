import { useState, useMemo } from "react";
import { Form, Spinner, Alert } from "react-bootstrap";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";


import { useProductos } from "../../hooks/useProductsApi";
import ProductGrid from "../ProductGrid";
import { DEFAULT_IMAGE } from "../../constants/shop"; 

export default function MockApiProductsView({ onAddToCart }) {
  const { productos, loading, error } = useProductos();


  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);


  // Normalizamos items al formato que espera ProductCard
  const items = useMemo(
    () =>
      (productos || []).map((p) => ({
        id: p.id,
        name: p.title ?? "Sin nombre",
        image: p.image || DEFAULT_IMAGE,
        price: Number(p.price) || 2000,
        _origin: "API",
      })),
    [productos]
  );


  const filtered = items.filter((c) =>
    (c.name || "").toLowerCase().includes(q.toLowerCase())
  );


  const visible = filtered.slice(0, limit);


  const handleAdd = (item) => {
    const payload = {
      id: item.id,
      name: item.name,
      image: item.image || DEFAULT_IMAGE,
      price: item.price,
    };


    window.dispatchEvent(new CustomEvent("cart:add", { detail: payload }));
    onAddToCart?.(payload);


    Swal.fire({
      title: "Nice! Your new item is in the cart.",
      imageUrl: "/images/sweetAlert.webp",
      draggable: true,
    });
  };


  return (
    <div>
      {/* Buscador */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search API products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Form>


      {loading && (
        <div className="d-flex justify-content-center py-4">
          <Spinner animation="border" />
        </div>
      )}


      {error && <Alert variant="danger">{error}</Alert>}


      {!loading && !error && (
        <>
          <ProductGrid items={visible} onAdd={handleAdd} />


          {filtered.length > limit && (
            <div className="text-center mt-3">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setLimit((n) => n + 12)}
              >
                Show more
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
