import axios from "axios";

import {
  LOCAL_STORAGE_ACCESS_TOKEN_KEY,
  LOCAL_STORAGE_REFRESH_TOKEN_KEY,
} from "@/constants/local-storage";

export const protectedApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const publicApi = axios.create({
  baseURL: "http://localhost:8080/api",
});

protectedApi.interceptors.request.use((request) => {
  const accessToken = localStorage.getItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
  if (!accessToken) {
    return request;
  }

  request.headers.Authorization = `Bearer ${accessToken}`;
  return request;
});

protectedApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config;
    // verificar se tenho um refresh token
    const refreshToken = localStorage.getItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return Promise.reject(error);
    }

    // verificar se o erro é 401 (não autorizado/token inválido)
    if (
      error.response?.status === 401 &&
      !request._retry &&
      !request.url.includes("users/refresh-token")
    ) {
      request._retry = true; // para evitar loop infinito
      try {
        // se eu tiver um refresh token, eu tento renovar o access token e refazer a requisição
        const response = await protectedApi.post("users/refresh-token", {
          refreshToken,
        });
        const newAccessToken = response.data.accessToken;
        const newRefreshToken = response.data.refreshToken;

        // salvar os novos tokens
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, newAccessToken);
        localStorage.setItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY, newRefreshToken);

        // refazer a requisição que falhou com o novo access token
        request.headers.Authorization = `Bearer ${newAccessToken}`;
        return protectedApi(request);
      } catch (refreshError) {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        localStorage.removeItem(LOCAL_STORAGE_REFRESH_TOKEN_KEY);
        console.error(refreshError);
      }
    }
    return Promise.reject(error);
  }, // será executada caso a resposta tenha erro -> status 400, 500 etc
);
