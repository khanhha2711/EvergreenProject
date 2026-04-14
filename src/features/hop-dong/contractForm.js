"use client";

import { useState } from "react";
import { CalenDarInput } from "@/components/inputs/calendar";
import { File, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmModal from "@/components/modal/comfirmModal";
import { toast } from "sonner";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { createHopDong } from "@/actions/hopDongAction";
import { useRouter } from "next/navigation";
import PATH from "@/routes/path";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import UploadFile from "@/components/file/uploadFile";

export default function ContractForm({ data, id }) {
  const [form, setForm] = useState({
    signedDate: "",
    expiredDate: "",
    contractName: "",
  });
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setIsLoading(true);
    if (!form.signedDate || !form.expiredDate) {
      setErrors({
        signedDate: "Vui lòng chọn ngày ký hợp đồng",
        expiredDate: "Vui lòng chọn ngày hết hạn",
      });
      return;
    }
    if (form.contractName === "") {
      setErrors({ contractName: "Vui lòng nhập tên hợp đồng" });
    }
    if (form.signedDate < new Date()) {
      setErrors({
        signedDate: "Ngày ký hợp đồng không được trước ngày hiện tại",
      });
      return;
    }

    if (new Date(form.expiredDate) < new Date(form.signedDate)) {
      setErrors({
        expiredDate: "Ngày hết hạn phải sau ngày ký hợp đồng",
      });
      return;
    }
    if (!file) {
      setErrors({
        file: "Vui lòng tải lên hợp đồng",
      });
      return;
    }
    const formatDate = (date) => {
      const d = new Date(date);
      return d.toISOString().split("T")[0];
    };
    const formData = new FormData();

    formData.append("quotationCode", id);
    formData.append("contractName", form.contractName);
    formData.append("signedDate", formatDate(form.signedDate));
    formData.append("expiredDate", formatDate(form.expiredDate));
    formData.append("file", file);
    
    const res = await createHopDong(formData);
    if (res.success) {
      setIsLoading(false);
      toast.success("Tạo hợp đồng thành công");
      router.push(PATH.ADMIN.HOPDONG.CHITIET(res.data));
      return;
    } else {
      toast.error(res.error || "Tạo hợp đồng thất bại");
      setIsLoading(false);
    }
  };
  const updateState = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-4 container ">
      <h2>Tạo hợp đồng mới</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Card className="bg-white grid grid-cols-3 gap-4 p-6 px-12 ">
          <h3>Thông tin báo giá</h3>
          <div className="flex gap-10 col-span-full">
            <p>Mã báo giá: </p>
            <b>{id}</b>
          </div>
          {CUSTOMER_FIELDS.map((field, index) => (
            <div key={index}>
              <p>{field.label}</p>
              <b>{data?.customer?.[field.name]}</b>
            </div>
          ))}
        </Card>
        <Card className="grid grid-cols-3 gap-6 px-12">
          <h3 className="col-span-full">Thông tin hợp đồng</h3>
          <div>
            <p className="mb-2">Tên hợp đồng</p>
            <Input
              placeholder="Nhập tên hợp đồng"
              value={form.contractName}
              onChange={(e) => updateState("contractName", e.target.value)}
            />
            {errors.contractName && (
              <p className="text-sm text-red-500">{errors.contractName}</p>
            )}
          </div>
          <div>
            <p className="mb-2">Ngày ký hợp đồng</p>
            <CalenDarInput
              date={form?.signedDate || ""}
              style="dd/MM/yyyy"
              updateState={(value) => updateState("signedDate", value)}
            />
            {errors.signedDate && (
              <p className="text-sm text-red-500">{errors.signedDate}</p>
            )}
          </div>
          <div className="flex-1">
            <p className="mb-2">Ngày hết hạn</p>
            <CalenDarInput
              date={form?.expiredDate || ""}
              style="dd/MM/yyyy"
              updateState={(value) => updateState("expiredDate", value)}
            />
            {errors.expiredDate && (
              <p className="text-sm text-red-500">{errors.expiredDate}</p>
            )}
          </div>
        </Card>

        <Card className="px-12">
          <UploadFile setFile={setFile} error={errors.file} file={file} />
        </Card>

        <div className="flex justify-end ">
          <div className="mx-4 space-x-2 mb-2">
            <Button
              variant="secondary"
              type="button"
              onClick={() => setIsOpenConfirm(true)}
              disabled={isLoading}
            >
              Hủy
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Đang tạo..." : "Tạo hợp đồng"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
