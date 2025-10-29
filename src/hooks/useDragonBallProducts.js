import { useEffect, useState } from "react";
import { fetchCharacters } from "../services/dragonball";


export default function useDragonBallProducts() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchCharacters();
        if (!cancelled) setItems(data);
      } catch (e) {
        if (!cancelled) {
          console.error(e);
          setError("No pude cargar personajes de la API de Dragon Ball.");
          setItems([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);


  return { items, loading, error };
}
