import axios from "axios";

export const api = axios.create({
  baseURL: "https://finance-app-api-k48s.onrender.com/api",
});
