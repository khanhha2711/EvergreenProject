"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { useCallback, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  createDichVu,
  deleteDichVu,
  updateDichVu,
} from "@/actions/dichVuAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DichVuTable({ data }) {
  const [isNew, setIsNew] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [services, setServices] = useState(data);
  const [idEdit, setIdEdit] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState("");
  const router = useRouter();

  const handleDelete = useCallback(async (item, index) => {
    if (!item.serviceCode) {
      setServices((prev) => prev.filter((service, i) => i !== index));
      return;
    }
    const res = await deleteDichVu(id);
    if (res.success) {
      setServices((prev) =>
        prev.filter((service) => id !== service.serviceCode),
      );
      toast.success("Xóa dịch vụ thành công");
    } else {
      toast.error("Có lỗi xảy ra hãy thực hiện lại");
    }
  }, []);

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      if (isNew) {
        const hasInvalid = services.some((service) => {
          const values = [service.serviceName, service.unit, service.price];
          return values.some((value) => !value);
        });
        if (hasInvalid) {
          setError("Không được để trống. Hãy nhập đầy đủ nội dung");
          return;
        }
        // setError("");
        const newServices = services
          .filter((service) => !service.serviceCode)
          .map(({ serviceCode, ...rest }) => rest);

        const res = await createDichVu(newServices);

        if (!res?.success) {
          throw new Error("Create failed");
        }

        setIsNew(false);
        setError("");
        toast.success("Lưu thành công");
        router.refresh();
      }

      if (isEdit) {
        console.log(services);
        const res = await updateDichVu(services);

        if (!res?.success) {
          throw new Error("Update failed");
        }

        setIsEdit(false);
        toast.success("Lưu thành công");
        router.refresh();
      }
    } catch (error) {
      console.error(error);
      toast.error("Lưu không thành công");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnChange = useCallback(({ id, field, value }) => {
    setServices((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, [field]: value } : item,
      ),
    );
    setError("");
  }, []);

  const handleEdit = useCallback(async (id) => {
    setIdEdit(id);
    setIsEdit(true);
  }, []);

  const columns = useMemo(
    () =>
      getColumns({
        onDelete: handleDelete,
        isNew,
        idEdit,
        isEdit,
        handleOnChange,
        onEdit: handleEdit,
      }),
    [handleDelete, idEdit, isEdit, isNew, handleOnChange, handleEdit],
  );

  const handleAdd = () => {
    setIdEdit("");
    setServices((prev) => [
      ...prev,
      {
        serviceCode: "",
        serviceName: "",
        unit: "",
        price: "",
      },
    ]);
    setIsNew(true);
  };
  return (
    <div className="container space-y-4">
      <h2 className="text-center">Bảng giá dịch vụ</h2>
      <div className="flex justify-end">
        <Button onClick={handleAdd}>+ Thêm dịch vụ</Button>
      </div>
      <DataTable data={services} columns={columns} />
      {(isNew || isEdit) && (
        <div className="flex justify-end gap-4">
          {errors && <p className="text-destructive">{errors} </p>}
          <Button
            onClick={() => {
              setIsEdit(false), setIsNew(false), setError("");
              setServices(
                services.filter((items) => items?.serviceCode !== ""),
              );
            }}
            variant="secondary"
          >
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            Lưu
          </Button>
        </div>
      )}
    </div>
  );
}
