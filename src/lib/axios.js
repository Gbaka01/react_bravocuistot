// src/lib/axios.js
import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://node-bravocuistot-1.onrender.com",
});

export default api;