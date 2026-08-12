import api from "./api";

export const loginApi = async (email: string, password: string) => {
  const res = await api.post("/api/v1/auth/login", { email, password });
  return res;
};

export const logoutApi = async () => {
  await api.post("/api/v1/auth/logout");
};
