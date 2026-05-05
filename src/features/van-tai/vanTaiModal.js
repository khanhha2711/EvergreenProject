"use client";
import {
  createVanTaiHangTau,
  createVanTaiNoiDia,
  getVanTai,
  updateVanTaiHangTau,
  updateVanTaiNoiDia,
} from "@/actions/vanTaiAction";
import LocationInput from "@/components/inputs/locationInput";
import ConfirmModal from "@/components/modal/comfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { vanTaiHangTau, vanTaiNoiDia } from "@/constants/van-tai";
import { validate } from "@/lib/validation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { z } from "zod";
const schemaNoiDia = z.object({
  companyName: z.string().min(1, "Không được để trống"),
  companyPhone: z.string().min(9),
  companyGmail: z.string().email(),
});
const schemaTau = z.object({
  shippingName: z.string().min(1, "Không được để trống"),
  gmail: z.string().email(),
});
export default function VanTaiModal({
  data,
  isEdit,
  isCreate,
  noiDia,
  setIsEdit,
  setIsOpen,
  setIsCreate,
}) {
  const [isConfirm, setIsConfirm] = useState(false);
  const [companyAddress, setCompanyAddress] = useState(
    data?.companyAddress || "",
  );
  const [errors, setError] = useState({});
  const router = useRouter();

  const title = noiDia
    ? isEdit
      ? "Chỉnh sửa đơn vị vận tải"
      : isCreate
      ? "Tạo mới đơn vị vận tải"
      : "Thông tin đơn vị vận tải"
    : isEdit
    ? "Chỉnh sửa đơn vị vận tải hàng tàu"
    : isCreate
    ? "Tạo mới đơn vị vận tải hàng tàu"
    : "Thông tin đơn vị vận tải hàng tàu";

  const isFormEmpty = (form) => {
    const formData = new FormData(form);
    const values = Object.fromEntries(formData.entries());

    return Object.values(values).every((val) => !val || val.trim() === "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    if (noiDia) {
      formData.append("companyAddress", companyAddress);
    }
    const dataForm = Object.fromEntries(formData.entries());
    console.log(dataForm);
    const schema = noiDia ? schemaNoiDia : schemaTau;
    const { isValid, errors } = validate({ schema, data: dataForm });
    if (!isValid) {
      setError(errors);
      return;
    }
    setError({});
    if (isCreate) {
      const res = noiDia
        ? await createVanTaiNoiDia(dataForm)
        : await createVanTaiHangTau(dataForm);
      if (res.success) {
        setIsOpen(false);
        router.refresh();
        toast.success("Tạo mới thành công");
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thực hiện lại");
      }
    } else {
      const res = noiDia
        ? await updateVanTaiNoiDia({ id: data?.companyCode, data: dataForm })
        : await updateVanTaiHangTau({ id: data?.shippingCode, data: dataForm });
      if (res.success) {
        setIsOpen(false);
        router.refresh();
        toast.success("Cập nhật thành công");
      } else {
        toast.error("Có lỗi xảy ra. Vui lòng thực hiện lại");
      }
    }
  };

  return (
    <div>
      {isConfirm && (
        <ConfirmModal
          title="Xác nhận hủy"
          content="Bạn có chắc chắn muốn hủy?"
          onCancel={() => {
            setIsConfirm(false);
          }}
          onConfirm={() => {
            setIsConfirm(false),
              setIsEdit(false),
              setIsOpen(false),
              setIsCreate(false);
          }}
        />
      )}
      <div className="flex justify-between items-center ">
        <div>
          <h2>{title}</h2>
          <p className="text-muted-foreground">
            Thông tin chi tiết của {noiDia ? "đơn vị vận tải" : "hãng tàu"}
          </p>
        </div>
        {!isEdit && !isCreate && (
          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsEdit(true)}
            >
              Chỉnh sửa
            </Button>
            <Button
              type="button"
              className="bg-white hover:bg-white text-black"
              onClick={() => setIsOpen(false)}
            >
              X
            </Button>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mt-4">
          {(noiDia ? vanTaiNoiDia : vanTaiHangTau).map((item) => (
            <div key={item.name} className="space-y-2">
              <p>{item.label}</p>

              {isEdit ? (
                item.name === "companyAddress" ? (
                  <LocationInput
                    diaDiem={(e) => setCompanyAddress(e)}
                    value={companyAddress || ""}
                  />
                ) : (
                  <Input defaultValue={data?.[item.name]} name={item.name} />
                )
              ) : isCreate ? (
                item.name === "companyAddress" ? (
                  <LocationInput
                    diaDiem={(e) => setCompanyAddress(e)}
                    value={companyAddress || ""}
                  />
                ) : (
                  <Input placeholder={item.label} name={item.name} />
                )
              ) : (
                <b>{data?.[item.name] || ""}</b>
              )}
              {errors[item.name] && (
                <p className="text-sm text-red-500">{errors[item.name][0]}</p>
              )}
            </div>
          ))}
        </div>

        {(isEdit || isCreate) && (
          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={(e) => {
                if (isFormEmpty(e.target.form)) {
                  setIsEdit(false);
                  setIsCreate(false);
                  setIsOpen(false);
                  return;
                }
                setIsConfirm(true);
              }}
            >
              Hủy
            </Button>
            <Button type="submit">Lưu</Button>
          </div>
        )}
      </form>
    </div>
  );
}
