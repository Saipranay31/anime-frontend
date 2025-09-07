"use client";
import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL:"https://anime-backend-2.onrender.com/api",
  withCredentials: true,
});


// === Auth helpers ===
export function saveAuth(token, email, role) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("role", role);
  }
}

export function getUser() {
  if (typeof window === "undefined") return null;

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");
  if (!token) return null;

  return { token, email, role };
}

export function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function getUserRole() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("role");
}

export function logout() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  localStorage.removeItem("role");
}

// ✅ Export Axios client
export default api;
