import { z } from "zod";

export const employeeSchema = z.object({
  employeeName: z.string().min(1, "Tên nhân viên không được để trống"),

  employeePhone: z
    .string()
    .min(9, "Số điện thoại không hợp lệ")
    .max(11, "Số điện thoại không hợp lệ")
    .regex(/^[0-9]+$/, "Chỉ được nhập số"),

  gmail: z.string().email("Email không hợp lệ"),

  roleName: z.string().min(1, "Vị trí không được để trống"),

  department: z.string().min(1, "Phòng ban không được để trống"),
});
