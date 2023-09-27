import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const createSession = async (email, password) => {
  return await api.post("/auth", { email, password });
};