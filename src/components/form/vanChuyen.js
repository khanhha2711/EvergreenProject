"use client";
import { ChevronDownIcon, Plane, Sailboat, Train, Truck } from "lucide-react";
import { Card } from "../ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import z from "zod";

import { CONTAINERS, HINH_THUC_KIEM_TRA, INCOTERM } from "@/constants/form";
import LocationInput from "../inputs/locationInput";
import { SelectComponent } from "../inputs/select";
const today = new Date();
today.setHours(0, 0, 0, 0);
const schema = z.object({
  diemDi: z.string().min(1, "Vui lòng chọn nơi lấy hàng"),
  diemDen: z.string().min(1, "Vui lòng chọn nơi giao hàng"),
  phuongThuc: z.string().min(1, "Vui lòng chọn phương thức vận chuyển"),
  hinhThuc: z.string().optional(),
  loaiContainer: z.string().optional(),
  container: z.string().optional(),
  incoterm: z.string().optional(),
  thoiGian: z
    .date({
      required_error: "Vui lòng chọn thời gian giao hàng",
    })
    .min(today, "Vui lòng chọn ngày ở tương lai"),
});
export default function VanChuyen({ onNext, defaultValue }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    phuongThuc: "",
    loaiContainer: "",
    diemDi: "",
    diemDen: "",
    hinhThuc: "",
    container: "",
    incoterm: "",
    thoiGian: new Date(),
    ...defaultValue,
  });

  const vanChuyen = [
    {
      icon: <Sailboat className="icon w-full" />,
      value: "duong_bien",
      label: "Đường biển",
    },
    {
      icon: <Plane className="icon w-full " />,
      value: "hang_khong",
      label: "Hàng không",
    },
    {
      icon: <Truck className="icon w-full" />,
      value: "duong_bo",
      label: "Đường bộ",
    },
    {
      icon: <Train className="icon w-full " />,
      value: "duong_sat",
      label: "Đường sắt",
    },
  ];

  const updateState = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
  const handleNext = (e) => {
    e.preventDefault();

    const result = schema.safeParse(form);

    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setErrors(formattedErrors);
    } else {
      setErrors({});
      onNext({
        vanChuyen: form,
      });
      console.log({ vanChuyen: form });
    }
  };
  console.log(form);
  return (
    <div className="w-full space-y-4 mb-2">
      <div>
        <h2 className="title-form">Thông tin vận chuyển</h2>
        <p className="description-form">
          Chi tiết về hành trình và yêu cầu vận chuyển
        </p>
      </div>
      {/* form */}
      <form
        id="vanChuyen"
        onSubmit={handleNext}
        className="w-full grid grid-cols-1 gap-6 sm:grid-cols-2"
      >
        <div>
          <p className="text-sm mb-2">Nơi lấy hàng *</p>
          <LocationInput
            diaDiem={(e) => updateState("diemDi", e)}
            value={form?.diemDi || ""}
          />
          {errors.diemDi && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>
        <div>
          <p className="text-sm mb-2">Nơi giao hàng *</p>
          <LocationInput
            diaDiem={(e) => updateState("diemDen", e)}
            value={form?.diemDen || ""}
          />
          {errors.diemDi && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>
        <div>
          <p className="text-sm mb-2">Hình thức</p>
          <SelectComponent
            placeHolder={"Chọn hình thức"}
            options={HINH_THUC_KIEM_TRA}
            onChange={(e) => updateState("hinhThuc", e)}
            value={form?.hinhThuc || ""}
          />
          {errors.diemDi && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 col-span-full gap-2">
          <p className="text-sm col-span-full">Phương thức vận chuyển </p>
          {vanChuyen.map((option, index) => (
            <Card
              key={option.value}
              className={cn(
                "text-center hover:bg-primary/10 hover:border-ring cursor-pointer transition duration-300 sm:text-[16px] text-sm",
                form.phuongThuc === option.value && "bg-primary/10 border-ring",
              )}
              onClick={() => updateState("phuongThuc", option.value)}
            >
              {option.icon}
              <div>{option.label}</div>
            </Card>
          ))}
          {errors.diemDi && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>
        {form.phuongThuc === "duong_bien" && (
          <div className="col-span-full grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm mb-2">FCL / LCL</p>

              <div className="flex gap-4">
                {["FCL", "LCL"].map((type) => (
                  <Button
                    key={type}
                    type="button"
                    className={cn(
                      "flex-1 bg-card text-foreground border shadow font-normal hover:border-ring hover:bg-primary/10",
                      form.loaiContainer === type &&
                        "bg-primary/10 border-ring",
                    )}
                    onClick={() => updateState("loaiContainer", type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-sm mb-2">Incoterms</p>
              <SelectComponent
                placeHolder="Chọn Incoterms"
                options={INCOTERM}
                onChange={(e) => updateState("incoterm", e)}
                value={form.incoterm}
              />
            </div>
          </div>
        )}

        {form.phuongThuc === "duong_bien" && form.loaiContainer === "FCL" && (
          <div>
            <p className="text-sm mb-2">Loại container</p>
            <SelectComponent
              placeHolder="Chọn container"
              options={CONTAINERS}
              onChange={(e) => updateState("container", e)}
              value={form.container}
            />
          </div>
        )}
        <div>
          <p className="text-sm mb-2">Thời gian giao hàng mong muốn</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!form.thoiGian}
                name="thoiGian"
                className="bg-card w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground focus:bg-card hover:bg-card hover:text-foreground hover:border-ring"
              >
                {form.thoiGian ? (
                  format(form.thoiGian, "dd/MM/yyyy")
                ) : (
                  <span>Chọn ngày</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form?.thoiGian}
                onSelect={(d) => updateState("thoiGian", d)}
                defaultMonth={form.thoiGian}
              />
            </PopoverContent>
          </Popover>
          {errors.diemDi && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>
      </form>
    </div>
  );
}
