import { DEFAULT_IMAGE, priceForIndex } from "../constants/shop";


const ENDPOINT = "https://dragonball-api.com/api/characters";


export const normalizeCharacters = (payload) => {
  const arr = Array.isArray(payload) ? payload : payload?.items ?? [];
  const total = Math.max(arr.length, 1);
  return arr.map((c, i) => ({
    id: `api-${c.id ?? i}`,
    name: c.name ?? c.character ?? "Desconocido",
    image: (c.image ?? c.img ?? "").trim() || DEFAULT_IMAGE,
    price: priceForIndex(i, total),
    _origin: "api",
  }));
};


export async function fetchCharacters() {
  const res = await fetch(ENDPOINT);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return normalizeCharacters(await res.json());
}
