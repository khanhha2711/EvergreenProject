"use client";
import { createHaiQuan } from "@/actions/haiQuanAction";
import UploadFile from "@/components/file/uploadFile";
import { CalenDarInput } from "@/components/inputs/calendar";
import { SelectComponent } from "@/components/inputs/select";
import ConfirmModal from "@/components/modal/comfirmModal";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CUSTOMFIELDS } from "@/constants/lo-hang";
import { useRouter } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";
import z from "zod";
import { containerColumns } from "./customColumn";
import { format } from "date-fns";
import { Card, CardAction } from "@/components/ui/card";

const containerSchema = z.object({
  containerNumber: z.string().min(1, "Số container không được để trống"),
  sealNumber: z.string().min(1, "Số seal không được để trống"),
  containerType: z.string().min(1, "Loại container không được để trống"),
});

export const documentSchema = z.object({
  declarationNumber: z.string().min(1, "Số tờ khai không được để trống"),

  declarationDate: z.string().min(1, "Ngày khai báo không được để trống"),

  customsBranch: z.string().min(1, "Chi cục hải quan không được để trống"),

  container: z.array(containerSchema).min(1, "Phải có ít nhất 1 container"),

  file: z
    .instanceof(File, {
      message: "Vui lòng chọn file",
    })
    .nullable(),
});

const CustomModal = ({ id, setIsCreate }) => {
  const [file, setFile] = useState(null);
  const [error, setError] = useState({});
  const [isComfirm, setIsConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [containers, setContainer] = useState([]);
  const [isNew, setIsNew] = useState(false);
  const [form, setForm] = useState({});
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError({});
    setIsLoading(true);
    const submitData = {
      ...form,
      container: containers,
      declarationDate: form.declarationDate
        ? format(new Date(form.declarationDate), "yyyy/MM/dd")
        : "",
    };
    const dataValidate = {
      ...submitData,
      file,
    };
    console.log(dataValidate);
    const result = documentSchema.safeParse(dataValidate);
    if (!result.success) {
      const formattedErrors = {};
      result.error.issues.forEach((err) => {
        formattedErrors[err.path[0]] = err.message;
      });
      setError(formattedErrors);
      return;
    }
    const formData = new FormData(e.target);
    formData.append("data", JSON.stringify(submitData));
    formData.delete("customsBranch");
    formData.delete("declarationNumber");
    formData.append("file", file);
    try {
      const res = await createHaiQuan({ id, formData });
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
  const updateState = ({ field, value }) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const handleCancel = () => {
    setIsConfirm(false);
    setIsCreate(false);
  };

  const handleConfirm = () => {
    setIsConfirm(false);
    setIsCreate(false);
  };

  const handleAddContainer = () => {
    setContainer((prev) => [
      ...prev,
      { containerNumber: "", sealNumber: "", containerType: "" },
    ]);
    setIsNew(true);
  };

  const handleOnChange = useCallback(({ id, field, value }) => {
    setContainer((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, [field]: value } : item,
      ),
    );
  }, []);

  const handleDelete = useCallback((index) => {
    setContainer((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const columns = useMemo(
    () => containerColumns({ isNew, handleOnChange, handleDelete }),
    [isNew, handleOnChange, handleDelete],
  );

  return (
    <Card className="mx-4 px-6">
      {isComfirm && (
        <ConfirmModal onCancel={handleCancel} onConfirm={handleConfirm} />
      )}
      <h3>Thông tin hải quan</h3>
      <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-6 mt-4">
        {CUSTOMFIELDS.slice(1, 4).map((field, index) => (
          <div key={index}>
            <label htmlFor={field.name}>{field.label}</label>
            {field.name === "declarationDate" ? (
              <CalenDarInput
                date={form?.declarationDate}
                style="dd/MM/yyyy"
                updateState={(date) =>
                  updateState({
                    field: "declarationDate",
                    value: date,
                  })
                }
              />
            ) : (
              <Input
                id={field.name}
                name={field.name}
                placeholder={field.placeholder}
                onChange={(e) =>
                  updateState({ field: field.name, value: e.target.value })
                }
              />
            )}

            {error[field.name] && (
              <p className="text-red-500 text-xs mt-1">{error[field.name]}</p>
            )}
          </div>
        ))}
        <div className="col-span-full flex justify-between items-center">
          <h3>Danh sách container</h3>
          <Button type="button" onClick={() => handleAddContainer()}>
            + Thêm container
          </Button>
        </div>
        <div className="col-span-full">
          <DataTable data={containers} columns={columns} />
          {error["container"] && (
            <p className="text-red-500 text-sm mb-2">{error["container"]}</p>
          )}
        </div>

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
            {form?.lane === "green" ? "Lưu và thông quan" : "Lưu và theo dõi"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default CustomModal;
