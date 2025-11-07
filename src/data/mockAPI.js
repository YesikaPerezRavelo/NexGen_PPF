export const API_BASE = "https://690a5e4f1a446bb9cc2265bd.mockapi.io";
export const PRODUCTS_RESOURCE = "productos";
export const API_URL = `${API_BASE}/${PRODUCTS_RESOURCE}`;


export async function fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText} ${txt}`);
  }
  return res.status === 204 ? null : res.json();
}
