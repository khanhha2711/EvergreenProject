"use client";

import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columnsService";
import { toast } from "sonner";

export default function DichVuTable({
  data,
  isAction = false,
  isNew,
  handleUpdate,
  services,
  serviceFields,
}) {
  const handleDelete = (id) => {
    handleUpdate((prev) => prev.filter((item) => item.serviceCode !== id));
  };

  const handleChange = async ({ id, field, value }) => {
    handleUpdate((prev) => {
      const isExist = prev.some(
        (item, index) => index !== id && item.id === value,
      );

      if (field === "id" && isExist) {
        toast.error("Dịch vụ này đã tồn tại!");
        return prev;
      }

      return prev.map((item, index) => {
        if (index !== id) return item;

        const updated = { ...item, [field]: value };
        if (field === "id") {
          const serviceAdded = services.find(
            (service) => service.serviceCode === value,
          );

          if (serviceAdded) {
            console.log(serviceAdded);
            updated.name = serviceAdded.serviceName;
            updated.unitPrice = serviceAdded.price;
            updated.unit = serviceAdded.unit;
          }
        }

        updated.total =
          Number(updated.quantity || 0) * Number(updated.unitPrice || 0);
        console.log("updatedTable", updated);
        return updated;
      });
    });
  };

  const columns = getColumns({
    onDelete: handleDelete,
    handleOnChange: handleChange,
    showActions: isAction,
    isNew,
    serviceFields,
  });
  return <DataTable data={data} columns={columns} />;
}
