import { useEffect, useState } from "react";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";


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


        // La API a veces viene como { items: [...] } y otras como array.
        const list = Array.isArray(json) ? json : (json?.items ?? []);
        // Normalizamos campos por si cambian nombres
        const normalized = list.map((c, i) => ({
          id: c.id ?? i,
          name: c.name ?? c.character ?? "Desconocido",
          image: c.image ?? c.img ?? "",
          // muchas variantes posibles de ki
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


  return (
    <div className="container py-4">
      {/* <h1 className="mb-3">Personajes — Dragon Ball</h1> */}


      {/* <div className="d-flex gap-3 align-items-center mb-3">
        <Form.Control
          placeholder="Buscar personaje..."
          value={q}
          onChange={(e) => setQ(e.target.value)}
          style={{ maxWidth: 320 }}
        />
        <Form.Select
          value={limit}
          onChange={(e) => setLimit(Number(e.target.value))}
          style={{ maxWidth: 140 }}
        >
          {[6, 12, 18, 24].map((n) => (
            <option key={n} value={n}>{n} resultados</option>
          ))}
        </Form.Select>
      </div> */}


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
                    <small className="text-secondary">
                      {c.affiliation}
                    </small>
                  )}
                  <Button variant="dark" className="mt-auto">
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
