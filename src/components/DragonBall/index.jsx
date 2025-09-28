// src/components/DragonBall.jsx
import { useEffect, useState } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";


export default function DragonBallShop() {
  const [chars, setChars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [limit, setLimit] = useState(12);


  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("https://dragonball-api.com/api/characters");
        const json = await res.json();
        const list = Array.isArray(json) ? json : (json?.items ?? []);
        const normalized = list.map((c, i) => ({
          id: c.id ?? i,
          name: c.name ?? c.character ?? "Desconocido",
          image: c.image ?? c.img ?? "",
          ki: c.ki ?? c.maxKi ?? c.power ?? c.powerLevel ?? "N/A",
          race: c.race ?? c.species ?? "",
          affiliation: c.affiliation ?? c.originPlanet ?? "",
        }));
        setChars(normalized);
      } catch (e) {
        setErr("No pude cargar personajes. Intenta de nuevo.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);


  const filtered = chars.filter((c) =>
    c.name.toLowerCase().includes(q.toLowerCase())
  );


  const handleAddLocal = (item) => {
    // 🔊 Emitimos un evento global que escuchará el SideNavbar
    window.dispatchEvent(new CustomEvent("cart:add", { detail: item }));
  };


  return (
    <div className="container py-4">
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
                {c.image && (
                  <Card.Img
                    src={c.image}
                    alt={c.name}
                    style={{ objectFit: "contain", height: 450 }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="mb-1">{c.name}</Card.Title>
                  <Card.Text className="text-muted mb-2">
                    KI: <strong>{c.ki}</strong>
                    {c.race ? <> • {c.race}</> : null}
                  </Card.Text>
                  {c.affiliation && (
                    <small className="text-secondary">{c.affiliation}</small>
                  )}


                  <Button
                    variant="dark"
                    className="mt-auto"
                    onClick={() =>
                      handleAddLocal({
                        id: c.id,
                        name: c.name,
                        image: c.image,
                        price: 99,
                      })
                    }
                  >
                    Add to cart
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
