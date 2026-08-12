import axios from "axios";
import { store } from "../store/store";
import { setCredentials, clearAuth } from "../store/authSlice";
import { serverAddressURL } from "../server/ServerAddress";

const api = axios.create({
  baseURL: serverAddressURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // No response = network error
    if (!error.response) {
      return Promise.reject(error);
    }

    /*
     * VERY IMPORTANT:
     * If refresh itself fails, DO NOT try refresh again.
     */
    if (originalRequest?.url?.includes("/auth/refresh")) {
      store.dispatch(clearAuth());
      return Promise.reject(error);
    }

    /*
     * Only access-token failures should trigger refresh.
     */
    if (
      (error.response.status === 401 || error.response.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("/api/v1/auth/refresh");

        const newAccessToken = res.data.token;

        store.dispatch(
          setCredentials({
            accessToken: newAccessToken,
            user: res.data.profile,
            role: res.data.role,
          })
        );

        originalRequest.headers.Authorization =
          `Bearer ${newAccessToken}`;

        return api(originalRequest);

      } catch (refreshError) {
        store.dispatch(clearAuth());

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;