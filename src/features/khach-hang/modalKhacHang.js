"use client";
import LocationInput from "@/components/inputs/locationInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { useState } from "react";
import { validate } from "../../lib/validation";
import { schemaCustomer } from "./schema";
import { createKhachHang, updateKhachHang } from "@/actions/khachHangAction";
import { toast } from "sonner";
import ConfirmModal from "@/components/modal/comfirmModal";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function ModalKhachHang({
  setIsOpen,
  data,
  isEdit,
  setIsEdit,
  isCreate,
  setIsCreate,
}) {
  const [address, setAddress] = useState(data?.customerAddress || "");
  const [error, setError] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataCustomer = Object.fromEntries(formData);
    dataCustomer.customerAddress = address;
    const { isValid, errors } = validate({
      schema: schemaCustomer,
      data: dataCustomer,
    });
    if (!isValid) {
      setError(errors);
      return;
    }
    setError({});
    if (isEdit) {
      const res = await updateKhachHang({
        id: data.customerCode,
        data: dataCustomer,
      });
      if (!res.success) {
        toast.error(
          "Cập nhật dữ liệu không thành công. Vui lòng thực hiện lại.",
        );
      } else {
        setIsOpen(false);
        setIsEdit(false);
        router.refresh();
        toast.success("Cập nhật thành công");
      }
    } else {
      const res = await createKhachHang(dataCustomer);
      if (!res.success) {
        toast.error(
          "Thêm mới dữ liệu không thành công. Vui lòng thực hiện lại.",
        );
      } else {
        setIsOpen(false);
        setIsCreate(false);
        router.refresh();
        toast.success("Thêm mới thành công");
      }
    }
  };
  const updateState = (field, e) => {
    setAddress(e);
  };
  return (
    <div className="px-6">
      {isConfirm && (
        <ConfirmModal
          title={"Xác nhận hủy bỏ"}
          content={"Bạn có chắc chắn muốn hủy bỏ thêm khách hàng mới không?"}
          onCancel={() => {
            setIsConfirm(false);
          }}
          onConfirm={() => {
            setIsOpen(false);
            setIsConfirm(false);
            setIsEdit(false);
            setIsCreate(false);
          }}
        />
      )}
      <div className="flex justify-between">
        <h3 className="mb-4">
          {isEdit
            ? "Chỉnh sửa thông tin khách hàng"
            : !isCreate
            ? "Thông tin khách hàng"
            : "Thêm mới khách hàng"}
        </h3>
        {!isEdit && !isCreate && (
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setIsEdit(true)}>
              Chỉnh sửa
            </Button>
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
        className=" grid grid-cols-2 gap-4 gap-x-10"
      >
        {CUSTOMER_FIELDS.map((field) => (
          <div key={field.name}>
            <p className="text-sm mb-1.5">{field.label}</p>
            {isEdit ? (
              field.name === "customerAddress" ? (
                <LocationInput
                  diaDiem={(e) => updateState(field.name, e)}
                  value={data?.[field.name] || address}
                />
              ) : (
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  defaultValue={data?.[field.name] || ""}
                />
              )
            ) : isCreate ? (
              field.name === "customerAddress" ? (
                <LocationInput
                  diaDiem={(e) => updateState(field.name, e)}
                  value={address}
                />
              ) : (
                <Input name={field.name} placeholder={field.placeholder} />
              )
            ) : (
              <b>{data?.[field.name]}</b>
            )}
            {error[field.name] && (
              <p className="text-red-500 text-xs mt-1">{error[field.name]}</p>
            )}
          </div>
        ))}
        {!isCreate && !isEdit ? null : (
          <div className="space-x-2 text-right col-span-full">
            <Button
              type="button"
              variant="secondary"
              className={"w-fit"}
              onClick={() => {
                setIsConfirm(true);
              }}
            >
              Hủy bỏ
            </Button>
            <Button className={"w-fit"} type="submit">
              Lưu
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
