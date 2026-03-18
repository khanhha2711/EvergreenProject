"use server";

import { formService } from "@/service/formService";
import { sendEmailService } from "@/service/sendEmailService";

export async function submitForm(form) {
  if (!form) return { success: false };
  try {
    const res = await formService.submitForm(form);
    return { success: true };
  } catch (error) {
    await sendEmailService({
      type: "WELCOME",
      data: { email: "" },
    });
    return { success: true, error: "Gửi form không thành công" };
  }
}
