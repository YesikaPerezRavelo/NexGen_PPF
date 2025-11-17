import { useEffect, useMemo, useState } from "react";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import catalog from "../../data/catalog.json";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DEFAULT_IMAGE = "/images/testingImg.jpg";
const EXTRA_KEY = "catalogExtras";

export default function BuildingProducts({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);

  // 🔹 SOLO catálogo "architectural" (clear-security + exterior-window)
  const flattenCatalog = useMemo(() => {
    const out = [];
    const architectural = catalog["architectural"] || {};

    for (const subKey of Object.keys(architectural)) {
      for (const p of architectural[subKey]) {
        out.push({
          id: `arch-${p.id}`,
          name: p.title,
          image: p.image || DEFAULT_IMAGE,
          price: Number(p.price) || 2000,
          _origin: "catalog",
          _category: "architectural",
          _subcategory: subKey,
        });
      }
    }

    return out;
  }, []);

  useEffect(() => {
    const load = () => {
      setLoading(true);
      setErr("");

      try {
        // 1) Catálogo local (JSON) solo "architectural"
        const base = flattenCatalog;

        // 2) Extras desde localStorage, pero solo category === "architectural"
        const extrasRaw = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
        const extras = extrasRaw
          .filter((p) => p.category === "architectural")
          .map((p) => ({
            id: `extra-${p.id}`,
            name: p.name,
            image: p.image || DEFAULT_IMAGE,
            price: Number(p.price) || 2000,
            _origin: "extra",
            _category: p.category,
            _subcategory: p.subcategory,
          }));

        // ✅ NO hay Dragon Ball API acá
        setItems([...extras, ...base]);
      } catch (e) {
        setErr("No pude cargar datos.");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [flattenCatalog]);

  const filtered = items.filter((c) =>
    (c.name || "").toLowerCase().includes(q.toLowerCase())
  );

  const handleAdd = (item) => {
    const payload = {
      id: item.id,
      name: item.name,
      image: item.image || DEFAULT_IMAGE,
      price: item.price,
    };

    // Evento para el contador del navbar
    window.dispatchEvent(new CustomEvent("cart:add", { detail: payload }));
    // Callback externo si existe
    onAddToCart?.(payload);

    Swal.fire({
      title: "Nice! Your new item is in the cart.",
      imageUrl: "./images/sweetAlert.webp",
      draggable: true,
    });
  };

  const handleImgError = (e) => {
    if (e.currentTarget.src.endsWith(DEFAULT_IMAGE)) return;
    e.currentTarget.src = DEFAULT_IMAGE;
    e.currentTarget.style.opacity = 1;
  };

  return (
    <div className="container py-4">
      {/* Buscador */}
      <Form className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search architectural products..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
      </Form>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" />
        </div>
      )}
      {err && <Alert variant="danger">{err}</Alert>}

      {!loading && !err && (
        <div className="row g-4">
          {filtered.slice(0, limit).map((c) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={c.id}>
              <Card className="h-100 shadow-sm">
                <Card.Img
                  src={c.image || DEFAULT_IMAGE}
                  alt={c.name}
                  style={{ objectFit: "cover", height: 450 }}
                  loading="lazy"
                  onError={handleImgError}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">{c.name}</Card.Title>

                  <div className="mb-2">
                    <span className="text-muted">Price: </span>
                    <strong>US${Number(c.price).toLocaleString()}</strong>
                    <div>
                      <small className="text-secondary">
                        {c._origin === "extra" ? "Catalog (added)" : "Catalog"}
                      </small>
                    </div>
                  </div>

                  <Button
                    variant="dark"
                    className="mt-auto"
                    onClick={() => handleAdd(c)}
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}

          {filtered.length > limit && (
            <div className="text-center">
              <Button
                variant="outline-secondary"
                onClick={() => setLimit((n) => n + 12)}
              >
                Show more
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
