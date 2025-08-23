import { apiGet, apiPost } from "./apiClient";

export function listProducts(category) {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  return apiGet(`/api/products${query}`);
}

export function getProduct(id) {
  return apiGet(`/api/products/${id}`);
}

export function createProduct(payload) {
  return apiPost("/api/products", payload);
}
