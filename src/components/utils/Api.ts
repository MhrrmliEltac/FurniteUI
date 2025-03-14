import axios from "axios";

 export const api = axios.create({
  baseURL: "https://furniture-server-two.vercel.app/api/users",
  withCredentials: true,
});
