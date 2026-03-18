"use client";

import { useState } from "react";
import * as z from "zod";
import { Building2, User, Mail, Phone, Hash, MapPin, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

const khachHangSchema = z.object({
  tenCongTy: z.string().min(2, "Vui lòng nhập tên công ty hoặc cá nhân"),
  nguoiLienHe: z.string().min(2, "Vui lòng nhập tên người liên hệ"),
  email: z.string().email("Email không hợp lệ"),
  soDienThoai: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
  maSoThue: z.string().optional(),
  diaChi: z.string().min(5, "Vui lòng nhập địa chỉ đầy đủ"),
  dichVu: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một dịch vụ"),
});

export default function KhachHang({ onNext, defaultValue }) {
  const [error, setError] = useState({});
  const danhSachDichVu = [
    { id: "haiQuan", label: "Khai báo hải quan" },
    { id: "c/o", label: "Xin C/O" },
    { id: "kiemHoa", label: "Kiểm hoá" },
    { id: "vanChuyen", label: "Vận chuyển quốc tế" },
  ];
  const thongTinKhachHang = [
    {
      label: "Tên công ty/Cá nhân *",
      placeHolder: "Công ty TNHH ABC",
      icon: <Building2 className="icon" />,
      name: "tenCongTy",
    },
    {
      label: "Người liên hệ *",
      placeHolder: "Nguyễn Văn A",
      icon: <User className="icon" />,
      name: "nguoiLienHe",
    },
    {
      label: "Email",
      placeHolder: "email@company.com",
      icon: <Mail className="icon" />,
      name: "email",
    },
    {
      label: "Số điện thoại",
      placeHolder: "0912345678",
      icon: <Phone className="icon" />,
      name: "soDienThoai",
    },
    {
      label: "Mã số thuế",
      placeHolder: "0123456789",
      icon: <Hash className="icon" />,
      name: "maSoThue",
    },
    {
      label: "Địa chỉ",
      placeHolder: "123 Đường ABC, Quận 1, TP.HCM",
      icon: <MapPin className="icon" />,
      name: "diaChi",
    },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData),
      dichVu: formData.getAll("dichVu"),
    };
    const result = khachHangSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
    } else {
      setError({});
      onNext({ khachHang: data });
      console.log({ khachHang: data });
    }
  };
  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div>
        <h2 className="title-form">Thông tin khách hàng</h2>
        <p className="description-form">
          Vui lòng cung cấp thông tin liên hệ và chọn dịch vụ bạn cần
        </p>
      </div>
      <form id="khachHang" onSubmit={handleNext} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {thongTinKhachHang.map((thongTin, index) => (
            <div key={index}>
              <h3 className="text-sm mb-2 ">{thongTin.label}</h3>
              <div className="flex relative flex-col">
                <div className="absolute translate-x-1/2 translate-y-2/3">
                  {thongTin.icon}
                </div>
                <Input
                  name={thongTin.name}
                  placeholder={thongTin.placeHolder}
                  className={cn("px-8")}
                  defaultValue={defaultValue?.[thongTin.name] || ""}
                />
                {error[thongTin.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {error[thongTin.name]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-4 mb-4">
          <h3 className="text-sm mb-2">Dịch vụ quan tâm *</h3>

          <div className="flex gap-4 flex-wrap justify-between">
            {danhSachDichVu.map((dichVu) => (
              <label key={dichVu.id} className="flex items-center gap-2">
                <Checkbox
                  name="dichVu"
                  value={dichVu.id}
                  defaultChecked={
                    defaultValue?.dichVu?.includes(dichVu.id) || ""
                  }
                />
                {dichVu.label}
              </label>
            ))}
          </div>

          {error.dichVu && (
            <p className="text-red-500 text-sm mt-1">{error.dichVu}</p>
          )}
        </div>
      </form>
    </div>
  );
}
