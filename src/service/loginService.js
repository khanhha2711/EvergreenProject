import api from "@/lib/axios";

export const loginService = {
  logIn: async ({ gmail, password }) => {
    return api.post("/login", { gmail, password });
  },
  forgotPassword: async (email) => {
    return api.post("/auth/forgot", { gmail: email });
  },
  sendOTP: async ({ email, otp }) => {
    return api.post("/auth/verify", { gmail: email, otp });
  },
  sendNewPassword: async ({ email, password }) => {
    return api.post("/auth/reset", { gmail: email, password });
  },
};
