import { apiPost } from "./apiClient";

/**
 * uploadImage(fileOrDataUrl)
 * - Pass a dataURL string (e.g. from FileReader) OR base64
 */
export async function uploadImage(dataUrl) {
  const res = await apiPost("/api/uploads", { file: dataUrl, folder: "products" });
  return res; // { url, public_id }
}
