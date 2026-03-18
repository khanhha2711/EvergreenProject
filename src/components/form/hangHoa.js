"use client";
import { Box, DollarSign, Ruler, Weight } from "lucide-react";
import { Input } from "../ui/input";
import * as z from "zod";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
const hangHoaSchema = z.object({
  tenHangHoa: z.string().min(2, "Tên hàng hóa phải có ít nhất 2 ký tự"),

  loaiHang: z.string().min(1, "Vui lòng chọn loại hàng"),

  soKien: z.coerce
    .number({ invalid_type_error: "Số kiện phải là số" })
    .min(1, "Số kiện phải lớn hơn 0"),

  trongLuong: z.coerce.number({
    invalid_type_error: "Trọng lượng phải là số",
  }),

  kichThuoc: z.coerce
    .number({
      invalid_type_error: "Kích thước phải là số",
    })
    .optional(),

  tongCBM: z.coerce
    .number({
      invalid_type_error: "CBM phải là số",
    })
    .optional(),

  giaTriHang: z.coerce
    .number({ invalid_type_error: "Giá trị phải là số" })
    .min(0, "Giá trị không hợp lệ"),
});

export default function HangHoa({ onNext, defaultValue }) {
  const [error, setError] = useState({});
  const [loaiHang, setLoaiHang] = useState("");
  const thongTinHangHoa = [
    {
      type: "input",
      label: "Tên hàng hóa",
      name: "tenHangHoa",
      placeHolder: "Công ty TNHH ABC",
      icon: <Box className="icon" />,
    },
    {
      type: "select",
      label: "Loai hàng *",
      name: "loaiHang",
      placeHolder: "Chọn loại hàng",
      loaiHang: [
        { name: "hangThuong", option: "Hàng thường" },
        { name: "nguyHiem", option: "Hàng nguy hiểm" },
        { name: "deVo", option: "Hàng dễ vỡ" },
        { name: "hangLanh", option: "Hàng lạnh" },
        { name: "dienTu", option: "Pin/Điện tử" },
      ],
    },
    {
      type: "input",
      label: "Số kiện",
      name: "soKien",
      placeHolder: "1000",
      icon: <Weight className="icon" />,
    },
    {
      type: "input",
      label: "Trọng lượng (kg) *",
      name: "trongLuong",
      placeHolder: "1000",
      icon: <Weight className="icon" />,
    },
    {
      type: "input",
      label: "Kích thước (D*R*C cm)",
      name: "kichThuoc",
      placeHolder: "120*80*100",
      icon: <Ruler className="icon" />,
    },
    {
      type: "input",
      label: "Tổng CBM(m3)",
      name: "tongCBM",
      placeHolder: "10.5",
      icon: <Box className="icon" />,
    },
    {
      type: "input",
      label: "Giá trị hàng (USD)",
      name: "giaTriHang",
      placeHolder: "5000",
      icon: <DollarSign className="icon" />,
    },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData),
      loaiHang: loaiHang,
    };
    const result = hangHoaSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
    } else {
      setError({});
      onNext({ hangHoa: data });
      console.log({ hangHoa: data });
    }
  };
  return (
    <div className={"w-full flex flex-col items-center gap-6"}>
      <div>
        <h2 className="text-xl text-center">Thông tin hàng hóa</h2>
        <p className="text-sm text-center">
          Cung cấp chi tiết về hàng hóa cần vận chuyển
        </p>
      </div>
      <form
        id="hangHoa"
        onSubmit={handleNext}
        className="flex flex-wrap w-full justify-between"
      >
        {thongTinHangHoa.map((hangHoa, index) => (
          <div
            key={index}
            className={cn(
              "w-[45%] mb-4",
              hangHoa.name === "tenHangHoa" && "w-full",
            )}
          >
            <h3 className="text-sm mb-2 ">{hangHoa.label}</h3>
            {hangHoa.type === "input" ? (
              <div className="flex relative flex-col">
                <div className="absolute translate-x-1/2 translate-y-2/3">
                  {hangHoa.icon}
                </div>
                <Input
                  name={hangHoa.name}
                  placeholder={hangHoa.placeHolder}
                  className={cn("px-8")}
                  defaultValue={defaultValue?.[hangHoa.name] || ""}
                />
                {error[hangHoa.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {error[hangHoa.name]}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <Select
                  value={defaultValue?.[hangHoa.name]}
                  onValueChange={setLoaiHang}
                  name="loaiHang"
                >
                  <SelectTrigger className="w-full ">
                    <SelectValue placeholder={hangHoa.placeHolder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {hangHoa.loaiHang.map((loai, index) => (
                        <SelectItem
                          className={cn("hover:text-card")}
                          key={index}
                          value={loai.name}
                        >
                          {loai.option}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                {error[hangHoa.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {error[hangHoa.name]}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  );
}
