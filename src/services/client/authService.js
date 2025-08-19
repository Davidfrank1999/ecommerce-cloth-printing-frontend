//login, signUp, logout
// src/services/authService.js
import api from "../api";


// signUp new user
export async function signUp(credentials) {
  const res = await api.post("/signup", credentials);
  return res.data;
}

// Login existing user
export async function login(email, password) {
  const res = await api.post("/login", { email, password });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token); // store token
  }

  return res.data;
}

// Logout
export function logout() {
  localStorage.removeItem("token");
}
