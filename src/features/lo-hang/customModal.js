"use client";
import { createChungTu } from "@/actions/chungTuAction";
import { createHaiQuan } from "@/actions/haiQuanAction";
import UploadFile from "@/components/file/uploadFile";
import { CalenDarInput } from "@/components/inputs/calendar";
import { SelectComponent } from "@/components/inputs/select";
import ConfirmModal from "@/components/modal/comfirmModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CUSTOMFIELDS, DOCUMENTFIELDS } from "@/constants/lo-hang";
import PATH from "@/routes/path";
import { setDate } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";
import z, { set } from "zod";

const documentSchema = z.object({
  declarationNumber: z.string().min(1, "Không được để trống"),
  createdAt: z.string().min(1, "Không được để trống"),
  lane: z.string().min(1, "Không được để trống"),
  file: z.instanceof(File, {
    message: "Vui lòng chọn file",
  }),
});
const CustomModal = ({ id, data, setIsCreate }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [isComfirm, setIsConfirm] = useState(false);
  const [lane, setLane] = useState(data?.lane || "");
  const [declarationDate, setDeclarationDate] = useState(
    data?.createdAt || new Date(),
  );
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);
    const formData = new FormData(e.target);
    formData.append("lane", lane);
    formData.append("createdAt", declarationDate);
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
      const res = await createHaiQuan({ id, formData });
      console.log(data);
      if (res.success) {
        toast.success("Tạo mới thành công");
        router.refresh();
      } else {
        throw new Error("Tạo thất bại");
      }
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra");
    } finally {
      setIsCreate(false);
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsConfirm(false);
    setIsCreate(false);
  };

  const handleConfirm = () => {
    setIsConfirm(false);
    setIsCreate(false);
  };
  return (
    <div className="mx-4 px-6">
      {isComfirm && (
        <ConfirmModal onCancel={handleCancel} onConfirm={handleConfirm} />
      )}
      <h3>Thông tin hải quan</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mt-4">
        {CUSTOMFIELDS.slice(1, 4).map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.name === "lane" ? (
              <SelectComponent
                placeHolder={field.placeholder}
                options={field.options}
                value={lane}
                onChange={(value) => setLane(value)}
              />
            ) : field.name === "createdAt" ? (
              <CalenDarInput
                date={declarationDate}
                style="dd/MM/yyyy"
                updateState={(date) => setDeclarationDate(date)}
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
              />
            )}

            {error[field.name] && (
              <p className="text-red-500 text-xs mt-1">{error[field.name]}</p>
            )}
          </div>
        ))}
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
              } else {
                setIsConfirm(true);
              }
            }}
            variant="secondary"
          >
            Hủy
          </Button>
          <Button disabled={isLoading} type="submit" className="w-fit">
            {lane === "green" ? "Lưu và thông quan" : "Lưu và theo dõi"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CustomModal;
