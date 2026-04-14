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
  const router = useRouter();

  const handleDelete = useCallback(async (id) => {
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
        const service = services.find((service) => service.serviceCode === "");
        if (!service.serviceName) {
          setServices(services.filter((service) => service.serviceCode !== ""));
          setIsNew(false);
          return;
        }
        const { serviceCode, ...payload } = service || {};
        if (!payload.serviceName) {
          setIsNew(false);
          router.refresh();
          return;
        }
        const res = await createDichVu(payload);

        if (!res?.success) {
          throw new Error("Create failed");
        }

        setIsNew(false);
        toast.success("Lưu thành công");
        router.refresh();
      }

      if (isEdit) {
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
  console.log(services);
  return (
    <div className="container space-y-4">
      <h2 className="text-center">Bảng giá dịch vụ</h2>
      <div className="flex justify-end">
        <Button onClick={handleAdd}>+ Thêm dịch vụ</Button>
      </div>
      <DataTable data={services} columns={columns} />
      {(isNew || isEdit) && (
        <div className="flex justify-end">
          <Button onClick={handleSubmit} disabled={isLoading}>
            Lưu
          </Button>
        </div>
      )}
    </div>
  );
}
