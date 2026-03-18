"use server";

import { loginService } from "@/service/loginService";

export async function loginAction(prevState, formData) {
  const data = Object.fromEntries(formData);
  const { username, password } = data;

  try {
    const res = await loginService.logIn({ username, password });
    return { success: true, user: res.data };
  } catch (error) {
    return { success: false, error: "Tài khoản hoặc mật khẩu không chính xác" };
  }
}
