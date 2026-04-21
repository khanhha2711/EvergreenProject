import z from "zod";

export const SHIPMENT_FIELDS = [
  {
    label: "Điểm đi",
    name: "origin",
    placeholder: "Ví dụ: Shanghai, China",
  },
  {
    label: "Điểm đến",
    name: "destination",
    placeholder: "Ví dụ: Hà Nội, Việt Nam",
  },
  { name: "createdAt", label: "Thời gian gửi hàng" },
  { name: "containerType", label: "Loại container" },
];

export const truckSchema = z.object({
  licensePlate: z.string().min(1, "Biển số xe không được để trống"),
  driverName: z.string().min(1, "Tên tài xế không được để trống"),
  driverPhone: z
    .string()
    .min(10, "SĐT không hợp lệ")
    .regex(/^[0-9]+$/, "SĐT chỉ được chứa số"),
  containerNumber: z.string().min(1, "Chưa chọn container"),
});

export const formSchema = z.object({
  companyName: z.string().min(1, "Chưa chọn đơn vị vận tải"),
  trucks: z.array(truckSchema).min(1, "Phải có ít nhất 1 chuyến xe"),
});
