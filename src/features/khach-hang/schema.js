import z from "zod";

export const schemaCustomer = z.object({
  companyName: z.string().min(2, "Vui lòng nhập tên công ty hoặc cá nhân"),
  contactName: z.string().min(2, "Vui lòng nhập tên người liên hệ"),
  customerEmail: z.string().email("Email không hợp lệ"),
  contactPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
  taxCode: z.string().optional(),
  customerAddress: z.string().min(5, "Vui lòng nhập địa chỉ đầy đủ"),
});
