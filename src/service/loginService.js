import { sendNewPassword } from "@/actions/forgotPasswordAction";
import api from "@/lib/axios";

export const loginService = {
  logIn: async ({ userName, password }) => {
    return api.post("/login", { userName, password });
  },
  forgotPassword: async (email) => {
    return api.post("/email", { email });
  },
  sendOTP: async ({ email, otp }) => {
    return api.post("/otp", { email, otp });
  },
  sendNewPassword: async ({ email, password }) => {
    return api.post("/newPassword", { email, password });
  },
};
