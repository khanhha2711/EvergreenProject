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
import { SelectComponent } from "../inputs/select";
const cargoSchema = z.object({
  cargoName: z.string().min(2, "Tên hàng hóa phải có ít nhất 2 ký tự"),

  cargoCategory: z.string().min(1, "Vui lòng chọn loại hàng"),

  packageCount: z.coerce
    .number({ invalid_type_error: "Số kiện phải là số" })
    .min(1, "Số kiện phải lớn hơn 0"),

  grossWeight: z.coerce
    .number({
      invalid_type_error: "Trọng lượng phải là số",
    })
    .min(1, "Trọng lượng phải lớn hơn 0"),

  cargoValue: z.coerce
    .number({ invalid_type_error: "Giá trị phải là số" })
    .min(1, "Giá trị không hợp lệ"),
});
const cargoField = [
  {
    type: "input",
    label: "Tên hàng hóa *",
    name: "cargoName",
    placeHolder: "Chọn nhập tên hàng hóa",
    icon: <Box className="icon" />,
  },
  {
    type: "select",
    label: "Loai hàng *",
    name: "cargoCategory",
    placeHolder: "Chọn loại hàng",
    categories: [
      { value: "hangThuong", label: "Hàng thường" },
      { value: "hangNguyHiem", label: "Hàng nguy hiểm" },
      { value: "hangDeVo", label: "Hàng dễ vỡ" },
      { value: "hangLanh", label: "Hàng lạnh" },
      { value: "dienTu", label: "Pin/Điện tử" },
    ],
  },
  {
    type: "input",
    label: "Số kiện *",
    name: "packageCount",
    placeHolder: "Nhập số kiện",
    icon: <Weight className="icon" />,
  },
  {
    type: "input",
    label: "Trọng lượng (kg) *",
    name: "grossWeight",
    placeHolder: "Nhập trọng lượng",
    icon: <Weight className="icon" />,
  },
  {
    type: "input",
    label: "Giá trị hàng hóa *",
    name: "cargoValue",
    placeHolder: "Nhập giá trị hàng hóa",
    icon: <DollarSign className="icon" />,
  },
];
export default function HangHoa({ onNext, defaultValue }) {
  const [error, setError] = useState({});
  const [cargoCategory, setCargoCategory] = useState(
    defaultValue?.cargoCategory || "",
  );

  const handleNext = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData),
      cargoCategory: cargoCategory,
    };
    const result = cargoSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
    } else {
      setError({});
      onNext({ cargo: data });
      console.log({ cargo: data });
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
        {cargoField.map((cargo, index) => (
          <div
            key={index}
            className={cn(
              "w-[45%] mb-4",
              cargo.name === "cargoName" && "w-full",
            )}
          >
            <h3 className="text-sm mb-2 ">{cargo.label}</h3>
            {cargo.type === "input" ? (
              <div className="flex relative flex-col">
                <div className="absolute translate-x-1/2 translate-y-2/3">
                  {cargo.icon}
                </div>
                <Input
                  name={cargo.name}
                  placeholder={cargo.placeHolder}
                  className={cn("px-8")}
                  defaultValue={defaultValue?.[cargo.name] || ""}
                />
                {error[cargo.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {error[cargo.name]}
                  </p>
                )}
              </div>
            ) : (
              <div>
                <SelectComponent
                  value={cargoCategory}
                  options={
                    cargoField.find((item) => item.name === "cargoCategory")
                      .categories
                  }
                  onChange={(value) => setCargoCategory(value)}
                  placeHolder={"Chọn loại hàng hóa"}
                />
                {error[cargo.name] && (
                  <p className="text-red-500 text-xs mt-1">
                    {error[cargo.name]}
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
