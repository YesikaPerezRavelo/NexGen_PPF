import { useCallback, useEffect, useState } from "react";
import { API_URL, fetchJson } from "../data/mockAPI";


const EMPTY_FORM = { title: "", description: "", price: "", stock: "", image: "" };


export function useProductos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState(null);


  const reload = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchJson(API_URL);
      setProductos(data);
    } catch (e) {
      console.error(e);
      setError("Error al obtener productos");
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => { reload(); }, [reload]);


  const create = async (payload) => {
    await fetchJson(API_URL, { method: "POST", body: JSON.stringify(payload) });
    await reload();
  };


  const update = async (id, payload) => {
    await fetchJson(`${API_URL}/${id}`, { method: "PUT", body: JSON.stringify(payload) });
    await reload();
  };


  const remove = async (id) => {
    await fetchJson(`${API_URL}/${id}`, { method: "DELETE" });
    await reload();
  };


  return { productos, loading, error, reload, create, update, remove, EMPTY_FORM };
}
