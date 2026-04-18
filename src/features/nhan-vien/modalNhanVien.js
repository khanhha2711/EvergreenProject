"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { validate } from "../../lib/validation";
import { EMPLOYEE_FIELDS } from "@/constants/nhan-vien";
import { createNhanVien, updateNhanVien } from "@/actions/nhanVienAction";
import { employeeSchema } from "./schema";
import ConfirmModal from "@/components/modal/comfirmModal";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ModalNhanVien({
  setIsOpen,
  data,
  isEdit,
  setIsEdit,
  isCreate,
  setIsCreate,
}) {
  const [error, setError] = useState({});
  const [isConfirm, setIsConfirm] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const dataEmployee = Object.fromEntries(formData);
    const { isValid, errors } = validate({
      schema: employeeSchema,
      data: dataEmployee,
    });
    if (!isValid) {
      setError(errors);
      return;
    }
    setError({});
    if (isEdit) {
      const res = await updateNhanVien({
        id: data.employeeCode,
        data: dataEmployee,
      });
      if (!res.success) {
        console.log(res.error);

        toast.error(
          "Cập nhật dữ liệu không thành công. Vui lòng thực hiện lại.",
        );
      } else {
        router.refresh();
        setIsOpen(false);
        setIsEdit(false);
        toast.success("Cập nhật thành công");
      }
    } else {
      const res = await createNhanVien(dataEmployee);
      if (!res.success) {
        toast.error(
          "Thêm mới dữ liệu không thành công. Vui lòng thực hiện lại.",
        );
      } else {
        router.refresh();
        setIsOpen(false);
        setIsCreate(false);
        toast.success("Thêm mới thành công");
      }
    }
  };

  return (
    <div>
      {isConfirm && (
        <ConfirmModal
          title={"Xác nhận hủy bỏ"}
          content={"Bạn có chắc chắn muốn hủy bỏ thêm khách hàng mới không?"}
          onCancel={() => setIsConfirm(false)}
          onConfirm={() => {
            setIsOpen(false);
            setIsEdit(false);
            setIsCreate(false);
            setIsConfirm(false);
          }}
        />
      )}
      <div className="flex justify-between">
        <h3 className="mb-4">
          {isEdit
            ? "Chỉnh sửa thông tin nhân viên"
            : !isCreate
            ? "Thông tin nhân viên"
            : "Thêm mới nhân viên"}
        </h3>
        {!isCreate && !isEdit && (
          <div className="flex gap-4">
            <Button variant="secondary" onClick={() => setIsEdit(true)}>
              Chỉnh sửa
            </Button>
            <Button
              className="bg-white hover:bg-white hover:text-primary text-black"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
          </div>
        )}
      </div>
      <form
        onSubmit={handleSubmit}
        className=" grid grid-cols-2 gap-4 gap-x-10 mx-4"
      >
        {EMPLOYEE_FIELDS.map((field) => (
          <div key={field.name}>
            <p className="text-sm mb-1.5">{field.label}</p>
            {isEdit ? (
              <Input defaultValue={data?.[field.name]} name={field.name} />
            ) : isCreate ? (
              <Input placeholder={field.label} name={field.name} />
            ) : (
              <b>{data?.[field.name] || ""}</b>
            )}
            {error[field.name] && (
              <p className="text-sm text-red-500">{error[field.name]}</p>
            )}
          </div>
        ))}
        {!isCreate && !isEdit ? null : (
          <div className="space-x-2 text-right col-span-full">
            <Button
              type="button"
              variant="secondary"
              className={"w-fit"}
              onClick={() => setIsConfirm(true)}
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
