// services/client/adminAuthService.js

import api from "../api";

export async function adminLogin(credentials) {
    const res = await api.post("admin/login", credentials);
    
    if (res.data.token) {
      localStorage.setItem("adminToken", res.data.token);
    }
    return res.data;
};

export const getAdminToken = () => {
  return localStorage.getItem("adminToken");
};

export const logoutAdmin = () => {
  localStorage.removeItem("adminToken");
};
