import z from "zod";

export const schema = z.object({
  customer: z.object({
    companyName: z.string().min(2, "Vui lòng nhập tên công ty hoặc cá nhân"),
    contactName: z.string().min(2, "Vui lòng nhập tên người liên hệ"),
    customerEmail: z.string().email("Email không hợp lệ"),
    contactPhone: z
      .string()
      .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
    taxCode: z.string().optional(),
    customerAddress: z.string().min(5, "Vui lòng nhập địa chỉ đầy đủ"),
    service: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một dịch vụ"),
  }),

  cargo: z.object({
    cargoName: z.string().min(2, "Tên hàng hóa phải có ít nhất 2 ký tự"),
    cargoCategory: z.string().min(1, "Vui lòng chọn loại hàng"),
    packageCount: z.coerce
      .number({ invalid_type_error: "Số kiện phải là số" })
      .min(1, "Số kiện phải lớn hơn 0"),
    grossWeight: z.coerce.number({
      invalid_type_error: "Trọng lượng phải là số",
    }),
    cargoValue: z.coerce
      .number({ invalid_type_error: "Giá trị phải là số" })
      .min(0, "Giá trị không hợp lệ"),
  }),

  transport: z.object({
    origin: z.string().min(1, "Vui lòng chọn nơi lấy hàng"),
    destination: z.string().min(1, "Vui lòng chọn nơi giao hàng"),
    createdAt: z.union([z.string(), z.date()]).refine((val) => {
      const date = new Date(val);
      return date > new Date();
    }, "Vui lòng chọn ngày ở tương lai"),
  }),
});
