"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { SHIPPINGFIELDS } from "@/constants/lo-hang";
import { cn } from "@/lib/utils";
import { Ship } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

import { z } from "zod";

export const BookingSchema = z.object({
  bookingCode: z.string().min(5, "Booking code không hợp lệ").max(50),
  shippingLineName: z.string().min(2, "Tên hãng tàu không hợp lệ").max(100),
  vesselName: z.string().min(2, "Tên tàu không hợp lệ").max(100),
  portOfLoading: z.string().min(2, "Cảng đi không hợp lệ").max(150),
  portOfDischarge: z.string().min(2, "Cảng đến không hợp lệ"),
});

const ShipView = ({ data, id }) => {
  const [isCreate, setIsCreate] = useState(
    !data || Object.keys(data).length === 0,
  );
  const [isEdit, setIsEdit] = useState(false);
  const [form, setForm] = useState(data || {});
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = BookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      toast.error("Vui lòng kiểm tra lại dữ liệu");
      return;
    }

    try {
      const res = isEdit
        ? await updateShipping({ id, data: form })
        : await createShipping({ data: form });
      if (res.success) {
        toast.success("Thực hiện thành công");
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setIsEdit(false);
      setIsCreate(false);
      setErrors({});
    }
  };
  return (
    <Card className="px-12">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-baseline">
          <Ship size={18} />
          <h3>Thông tin đặt tàu</h3>
        </div>
        {!isCreate && (
          <Button variant={"secondary"} onClick={() => setIsEdit(true)}>
            Chỉnh sửa
          </Button>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-3 gap gap-y-4 gap-x-8">
          {SHIPPINGFIELDS.map((field, index) => (
            <div key={index} className="space-y-1.5">
              <p>{field.label}</p>
              {isEdit || isCreate ? (
                <>
                  <Input
                    name={field.name}
                    value={form?.[field.name] || ""}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        [field.name]: e.target.value,
                      }))
                    }
                    placeholder={field.placeholder}
                  />
                  {errors[field.name] && (
                    <p className="text-red-500 text-sm">
                      {errors[field.name][0]}
                    </p>
                  )}
                </>
              ) : (
                <b>{data?.[field.name]}</b>
              )}
            </div>
          ))}
        </div>

        {(isCreate || isEdit) && (
          <div className="mt-2 flex gap-2 justify-end">
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                setIsEdit(false), setIsCreate(false), setForm({});
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
};

export default ShipView;
