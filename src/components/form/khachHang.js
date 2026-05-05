"use client";

import { useEffect, useState } from "react";
import * as z from "zod";
import { Building2, User, Mail, Phone, Hash, MapPin, Map } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { getServiceFields } from "@/constants/dich-vu";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";

const customerSchema = z.object({
  companyName: z.string().min(2, "Vui lòng nhập tên công ty hoặc cá nhân"),
  contactName: z.string().min(2, "Vui lòng nhập tên người liên hệ"),
  customerEmail: z.string().email("Email không hợp lệ"),
  contactPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
  taxCode: z.string().optional(),
  customerAddress: z.string().min(5, "Vui lòng nhập địa chỉ đầy đủ"),
  service: z.array(z.string()).min(1, "Vui lòng chọn ít nhất một dịch vụ"),
});

export default function KhachHang({ onNext, defaultValue }) {
  const [error, setError] = useState({});
  const [serviceFields, setServiceFields] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      const data = await getServiceFields();
      setServiceFields(data);
    };

    fetchServices();
  }, []);
  const handleNext = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      ...Object.fromEntries(formData),
      service: formData.getAll("service"),
    };
    const result = customerSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
    } else {
      setError({});
      onNext({ customer: data });
      console.log({ customer: data });
    }
  };
  console.log(error);
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
          {CUSTOMER_FIELDS.map((field, index) => (
            <div key={index}>
              <h3 className="text-sm mb-2 ">{field.label}</h3>
              <div className="flex relative flex-col">
                <div className="absolute translate-x-1/2 translate-y-2/3">
                  {field.icon}
                </div>
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  className={cn("px-8")}
                  defaultValue={defaultValue?.[field.name] || ""}
                />
                {error[field.name] && (
                  <p className="text-red-500 text-sm mt-1">
                    {error[field.name]}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full mt-4 mb-4">
          <h3 className="text-sm mb-2">Dịch vụ quan tâm *</h3>

          <div className="flex gap-4 flex-wrap justify-between">
            {serviceFields.slice(1, serviceFields.length).map((service) => (
              <label key={service.value} className="flex items-center gap-2">
                <Checkbox
                  name="service"
                  value={service.value}
                  defaultChecked={
                    defaultValue?.service?.includes(service.value) || ""
                  }
                />
                {service.label}
              </label>
            ))}
          </div>

          {error.service && (
            <p className="text-red-500 text-sm mt-1">{error.service}</p>
          )}
        </div>
      </form>
    </div>
  );
}
