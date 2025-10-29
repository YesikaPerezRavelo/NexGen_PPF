export function dispatchAddToCart(payload) {
  window.dispatchEvent(new CustomEvent("cart:add", { detail: payload }));
}
