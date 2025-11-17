import { useEffect, useMemo, useState } from "react";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import catalog from "../../data/catalog.json";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DEFAULT_IMAGE = "/images/testingImg.jpg";
const EXTRA_KEY = "catalogExtras";

export default function AutomotiveProtectionProducts({ onAddToCart }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);

  // 🔹 SOLO catálogo "automotive-protection"
  const flattenCatalog = useMemo(() => {
    const out = [];
    const automotive = catalog["automotive-protection"] || {};

    for (const subKey of Object.keys(automotive)) {
      for (const p of automotive[subKey]) {
        out.push({
          id: `auto-${p.id}`,
          name: p.title,
          image: p.image || DEFAULT_IMAGE,
          price: Number(p.price) || 2000,
          _origin: "catalog",
          _category: "automotive-protection",
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
        // 1) Catálogo local (JSON) sólo automotive-protection
        const base = flattenCatalog;

        // 2) Extras desde localStorage PERO sólo category === "automotive-protection"
        const extrasRaw = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]");
        const extras = extrasRaw
          .filter((p) => p.category === "automotive-protection")
          .map((p) => ({
            id: `extra-${p.id}`,
            name: p.name,
            image: p.image || DEFAULT_IMAGE,
            price: Number(p.price) || 2000,
            _origin: "extra",
            _category: p.category,
            _subcategory: p.subcategory,
          }));

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

    window.dispatchEvent(new CustomEvent("cart:add", { detail: payload }));
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
          placeholder="Search automotive protection..."
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
