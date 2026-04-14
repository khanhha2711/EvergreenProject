"use server";
import { loginService } from "@/service/loginService";
import { sendEmailService } from "@/service/sendEmailService";
import { cookies } from "next/headers";

export async function sendEmail(prevState, formData) {
  const data = Object.fromEntries(formData);
  try {
    const res = await loginService.forgotPassword(data.email);
    const otp = res.data.otp;
    await sendEmailService({ type: "OTP", data: { otp } });
    const cookieStore = await cookies();
    cookieStore.set("email", data.email, {
      httpOnly: true,
      maxAge: 300,
      path: "/",
    });
    return { success: true, data: res.data };
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    return { success: false, error: "Email không tồn tại" };
  }
}

export async function sendOTP(prevState, formData) {
  const data = Object.fromEntries(formData);
  const otp = data.maXacThuc;
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;
  try {
    const res = await loginService.sendOTP({ email, otp });
    return { success: true, user: res.data };
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    return {
      success: false,
      error: "Mã xác thực không chính xác yêu cầu nhập lại ",
    };
  }
}

export async function sendNewPassword(prevState, formData) {
  const data = Object.fromEntries(formData);
  const password = data.password1;
  const cookieStore = await cookies();
  const email = cookieStore.get("email")?.value;
  try {
    const res = await loginService.sendNewPassword({ email, password });
    return { success: true, user: res.data };
  } catch (error) {
    console.log(error.response?.data?.message || error.message);
    return {
      success: false,
      error: "Có lỗi xảy ra",
    };
  }
}
