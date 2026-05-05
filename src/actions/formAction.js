import { formService } from "@/service/formService";
import { sendEmailService } from "@/service/sendEmailService";
import { format } from "date-fns";

export async function submitForm(form) {
  try {
    const cleanTransport = Object.fromEntries(
      Object.entries(form.transport || {}).filter(
        ([key, value]) => key !== "undefined" && value !== undefined,
      ),
    );

    const { createdAt, ...rest } = cleanTransport;

    const formattedForm = {
      ...form,
      transport: {
        ...rest,
        createdAt: createdAt ? format(new Date(createdAt), "yyyy/MM/dd") : null,
      },
    };
    formattedForm.customer.service.push("DV-2026-001");
    console.log(formattedForm);
    const res = await formService.submitForm(formattedForm);
    try {
      await sendEmailService({
        type: "WELCOME",
        data: { email: form.customer?.email },
      });
    } catch (e) {
      console.log("Email lỗi nhưng bỏ qua:", e);
    }

    return { success: true, data: res.data };
  } catch (error) {
    console.log("MAIN ERROR:", error);
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
