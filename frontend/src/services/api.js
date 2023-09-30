import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ,
});

export const createSession = async (email, password) => {
  return await api.post("/auth", { email, password });
};