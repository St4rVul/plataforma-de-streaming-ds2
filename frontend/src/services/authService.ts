import api from "./api";

export const authService = {
  async login(email: string, password: string) {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      return access_token;
    } catch (error) {
      throw new Error("Error al iniciar sesión");
    }
  },

  async register(email: string, password: string) {
    try {
      const response = await api.post("/auth/register", { email, password });
      const { access_token } = response.data;
      localStorage.setItem("token", access_token);
      return access_token;
    } catch (error) {
      throw new Error("Error al registrarse");
    }
  },

  logout() {
    localStorage.removeItem("token");
  },

  getToken() {
    return localStorage.getItem("token");
  },
};
