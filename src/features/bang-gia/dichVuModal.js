"use client";
import { createDichVu, updateDichVu } from "@/actions/dichVuAction";
import { SelectComponent } from "@/components/inputs/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SERVICE_UNITS, SERVICEFIELDS } from "@/constants/dich-vu";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";

export const dichVuSchema = z.object({
  serviceName: z.string().min(1, "Tên dịch vụ không được để trống"),
  description: z.string().optional(),
  unit: z.string().min(1, "Đơn vị không được để trống"),
  price: z.coerce
    .number({
      invalid_type_error: "Giá phải là số",
    })
    .min(0, "Giá phải lớn hơn hoặc bằng 0"),
});

export default function DichVuModal({
  isEdit,
  isCreate,
  data,
  setIsOpen,
  setIsEdit,
  setIsCreate,
}) {
  const [errors, setErrors] = useState([]);
  const [unit, setUnit] = useState("");
  const [description, setDescription] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    formData.append("unit", unit);
    formData.append("description", description);

    const dataSubmit = Object.fromEntries(formData);

    const result = dichVuSchema.safeParse(dataSubmit);

    if (!result.success) {
      const fieldErrors = {};

      result.error.issues.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });

      setErrors(fieldErrors);
      return;
    }

    try {
      const res = isCreate
        ? await createDichVu(dataSubmit)
        : await updateDichVu({ id: data.serviceCode, data: dataSubmit });

      if (res.success) {
        setIsOpen(false);
        setIsCreate(false);
        setIsEdit(false);
        router.refresh();
        toast.success("Tạo mới thành công");
      }
    } catch (error) {
      console.log(error);
      toast.error("Có lỗi xảy ra, hãy thực hiện lại");
      router.refresh();
    } finally {
      setErrors([]);
    }
  };
  return (
    <Card className=" px-12 ">
      <div className="flex justify-between items-center">
        <div className="">
          <h2>{isCreate ? "Thêm dịch vụ mới" : "Thông tin dịch vụ"}</h2>
          <p className="text-gray-500">
            {isCreate
              ? "Nhập thông tin chi tiết để tạo dịch vụ"
              : "Thông tin chi tiết về dịch vụ"}
          </p>
        </div>

        {isEdit || isCreate ? (
          ""
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => setIsOpen(false)}
              className="bg-white hover:bg-white text-black"
            >
              <X />
            </Button>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-3 gap-x-10 gap-y-4 "
      >
        {SERVICEFIELDS.slice(0, -1).map((service, index) => (
          <div
            key={index}
            className={cn(
              "space-y-2",
              service.name === "description" && "col-span-full",
            )}
          >
            <p>{service.label}</p>
            {isEdit || isCreate ? (
              service.name === "unit" ? (
                <SelectComponent
                  value={unit}
                  placeHolder="Chọn đơn vị"
                  options={SERVICE_UNITS}
                  onChange={(value) => setUnit(value)}
                />
              ) : service.name === "description" ? (
                <Textarea
                  name="description"
                  placeholder="Nhập mô tả dịch vụ"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              ) : (
                <Input
                  name={service.name}
                  defaultValue={data?.[service.name] || ""}
                  placeholder={service.placeholder}
                />
              )
            ) : (
              <b>
                {service.name === "unit"
                  ? SERVICE_UNITS.find(
                      (item) => item.value === data?.[service.name],
                    )?.label
                  : data?.[service.name]}
              </b>
            )}
            {errors && (
              <p className="text-destructive">{errors?.[service.name]}</p>
            )}
          </div>
        ))}
        {(isEdit || isCreate) && (
          <div className="flex gap-4 justify-end col-span-full">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsOpen(false);
                setIsCreate(false);
                setIsEdit(false);
              }}
            >
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </div>
        )}
      </form>
    </Card>
  );
}
