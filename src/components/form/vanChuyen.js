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

import { INCOTERM } from "@/constants/form";
import LocationInput from "../inputs/locationInput";
import { SelectComponent } from "../inputs/select";
import { Input } from "../ui/input";
const today = new Date();
today.setHours(0, 0, 0, 0);
const schema = z.object({
  origin: z.string().min(1, "Vui lòng chọn nơi lấy hàng"),
  destination: z.string().min(1, "Vui lòng chọn nơi giao hàng"),
  incoterm: z.string().optional(),
  date: z
    .date({
      required_error: "Vui lòng chọn thời gian giao hàng",
    })
    .min(today, "Vui lòng chọn ngày ở tương lai"),
});
export default function VanChuyen({ onNext, defaultValue }) {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    origin: "",
    destination: "",
    container: "40DC",
    incoterm: "",
    date: new Date(),
    ...defaultValue,
  });

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
        transport: form,
      });
      console.log({ transport: form });
    }
  };
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
            diaDiem={(e) => updateState("origin", e)}
            value={form?.origin || ""}
          />
          {errors.origin && (
            <p className="text-red-500 text-xs mt-1">{errors.diemDi}</p>
          )}
        </div>
        <div>
          <p className="text-sm mb-2">Nơi giao hàng *</p>
          <LocationInput
            diaDiem={(e) => updateState("destination", e)}
            value={form?.destination || ""}
          />
          {errors.destination && (
            <p className="text-red-500 text-xs mt-1">{errors.destination}</p>
          )}
        </div>

        <div>
          <p className="text-sm mb-2">Incoterms *</p>
          <SelectComponent
            placeHolder="Chọn Incoterms"
            options={INCOTERM}
            onChange={(e) => updateState("incoterm", e)}
            value={form.incoterm}
          />
          {errors.incoterm && (
            <p className="text-red-500 text-xs mt-1">{errors.incorterm}</p>
          )}
        </div>

        <div>
          <p className="text-sm mb-2">Loại container *</p>
          <Input defaultValue={"40DC"} name="container"></Input>
        </div>

        <div>
          <p className="text-sm mb-2">Thời gian giao hàng mong muốn</p>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                data-empty={!form.date}
                name="date"
                className="bg-card w-full justify-between text-left font-normal data-[empty=true]:text-muted-foreground focus:bg-card hover:bg-card hover:text-foreground hover:border-ring"
              >
                {form.date ? (
                  format(form.date, "dd/MM/yyyy")
                ) : (
                  <span>Chọn ngày</span>
                )}
                <ChevronDownIcon />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={form?.date}
                onSelect={(d) => updateState("date", d)}
                defaultMonth={form.date}
              />
            </PopoverContent>
          </Popover>
          {errors.date && (
            <p className="text-red-500 text-xs mt-1">{errors.date}</p>
          )}
        </div>
      </form>
    </div>
  );
}
