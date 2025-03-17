import axios from "axios";

export const api = axios.create({
  // baseURL: "https://furniture-server-two.vercel.app/api/users",
  baseURL: "http://localhost:4000/api/users",
  withCredentials: true,
});
