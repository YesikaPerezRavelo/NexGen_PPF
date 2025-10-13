import { useEffect, useMemo, useState } from "react";
import { Card, Button, Spinner, Alert, Form } from "react-bootstrap";
import catalog from "../../data/catalog.json";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const DEFAULT_IMAGE = "/images/testingImg.jpg";
const EXTRA_KEY = "catalogExtras";

export default function DragonBall({ onAddToCart }) {
  const [items, setItems] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);

  const flattenCatalog = useMemo(() => {
    const out = [];
    for (const catKey of Object.keys(catalog)) {
      for (const subKey of Object.keys(catalog[catKey])) {
        for (const p of catalog[catKey][subKey]) {
          out.push({
            id: `cat-${p.id}`,
            name: p.title,
            image: p.image || DEFAULT_IMAGE,
            price: Number(p.price) || 2000,
            _origin: "catalog",
            _category: catKey,
            _subcategory: subKey,
          });
        }
      }
    }
    return out;
  }, []);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setErr("");

      try {
        // 1) Catálogo local (JSON)
        const base = flattenCatalog;

        // 2) Extras desde localStorage
        const extras = JSON.parse(localStorage.getItem(EXTRA_KEY) || "[]").map(
          (p) => ({
            id: `extra-${p.id}`,
            name: p.name,
            image: p.image || DEFAULT_IMAGE,
            price: Number(p.price) || 2000,
            _origin: "extra",
            _category: p.category,
            _subcategory: p.subcategory,
          })
        );

        // 3) API DragonBall
        let apiProducts = [];
        try {
          const res = await fetch("https://dragonball-api.com/api/characters");
          const json = await res.json();
          const list = Array.isArray(json) ? json : json?.items ?? [];
          const total = Math.max(list.length, 1);
          const MIN = 2000, MAX = 10000, RANGE = MAX - MIN;
          apiProducts = list.map((c, i) => {
            const ratio = total > 1 ? i / (total - 1) : 0;
            let price = MIN + ratio * RANGE;
            price = Math.round(price / 50) * 50;
            return {
              id: `api-${c.id ?? i}`,
              name: c.name ?? c.character ?? "Desconocido",
              image: (c.image ?? c.img ?? "").trim() || DEFAULT_IMAGE,
              price,
              _origin: "api",
            };
          });
        } catch {
     
         
          apiProducts = [];
        }

        setItems([...extras, ...base, ...apiProducts]);
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

    // ✅ SweetAlert: toast de éxito
    Swal.fire({
      icon: "success",
      title: `${item.name} added to cart`,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 1400,
      timerProgressBar: true,
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
          placeholder="Search products..."
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
                        {c._origin === "extra"
                          ? "Catalog (added)"
                          : c._origin === "catalog"
                          ? "Catalog"
                          : "API"}
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
