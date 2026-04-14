"use client";
import { createChungTu, updateChungTu } from "@/actions/chungTuAction";
import UploadFile from "@/components/file/uploadFile";
import ConfirmModal from "@/components/modal/comfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { DOCUMENTFIELDS } from "@/constants/lo-hang";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import z from "zod";

const documentSchema = z.object({
  documentNumber: z.string().min(1, "Không được để trống"),
  documentType: z.string().min(1, "Không được để trống"),
  file: z.instanceof(File, {
    message: "Vui lòng chọn file",
  }),
});
const DocumentModal = ({
  id,
  dataDetail,
  setIsCreate,
  isCreate,
  isEdit,
  setIsEdit,
  setDataDetail,
  fetchData,
}) => {
  const [file, setFile] = useState(
    (isCreate && dataDetail?.attachment) || null,
  );
  const [error, setError] = useState({});
  const [isComfirm, setIsConfirm] = useState(false);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);
    const formData = new FormData(e.target);
    if (isEdit) {
      formData.append("documentNumber", dataDetail.documentNumber);
      formData.append("documentType", dataDetail.documentType);
    }
    const data = {
      ...Object.fromEntries(formData),
      file,
    };
    const result = documentSchema.safeParse(data);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
      return;
    }

    formData.append("file", file);

    try {
      let res;
      if (isCreate) {
        res = await createChungTu({ id, formData });
      } else {
        const documentId = dataDetail?.documentCode;
        formData.delete("documentType");
        formData.delete("documentNumber");
        res = await updateChungTu({ id: documentId, data: formData });
        fetchData(dataDetail?.documentCode);
      }
      if (res.success) {
        toast.success("Tạo mới thành công");
        router.refresh();
        setIsCreate(false);
        setIsEdit(false);
        setDescription("");
      } else {
        throw new Error("Tạo thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsConfirm(false);
    setIsCreate(false);
    setIsEdit(false);
    setDataDetail(null);
    setDescription("");
  };

  const handleConfirm = () => {
    setIsCreate(false);
    setIsEdit(false);
    setIsConfirm(false);
    setDataDetail(null);
    setDescription("");
  };
  return (
    <div className="mx-4 px-6">
      {isComfirm && (
        <ConfirmModal onCancel={handleCancel} onConfirm={handleConfirm} />
      )}
      {isCreate ? (
        <h3>Thêm chứng từ mới</h3>
      ) : (
        <h3>Chỉnh sửa thông tin chứng từ</h3>
      )}
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mt-4">
        {isCreate &&
          DOCUMENTFIELDS.slice(1, 3).map((field, index) => (
            <div key={index}>
              <label htmlFor={field.name}>{field.label}</label>
              <Input
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
              />
              {error[field.name] && (
                <p className="text-red-500 text-xs mt-1">{error[field.name]}</p>
              )}
            </div>
          ))}
        {isEdit &&
          DOCUMENTFIELDS.slice(0, 3).map((field, index) => (
            <div key={index}>
              <p>{field.label}</p>
              <b>{dataDetail?.[field.name]}</b>
            </div>
          ))}
        {isEdit && (
          <div className="col-span-full">
            <h3>Lý do</h3>
            <div className="mt-2">
              <Textarea
                name="description"
                placeholder="Nhập lý do ở đây"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        )}

        <div className="col-span-full bg-white">
          <UploadFile setFile={setFile} error={error.file} file={file} />
        </div>

        <div className="col-span-full flex justify-end space-x-4">
          <Button
            type="button"
            onClick={(e) => {
              const form = e.currentTarget.closest("form");
              const formData = new FormData(form);
              const data = Object.fromEntries(formData);

              const hasValue = Object.values(data).some((v) => v !== "");

              if (!hasValue && !file) {
                setIsCreate(false);
                setIsEdit(false);
              } else {
                setIsConfirm(true);
              }
            }}
            variant="secondary"
          >
            Hủy
          </Button>
          <Button disable={isLoading} type="submit" className="w-fit">
            Lưu
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DocumentModal;
