import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

export const truckColumn = ({ isNew, handleDelete, handleOnChange }) => {
  const columns = [
    {
      id: "stt",
      header: "STT",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "licensePlate",
      header: "Biển số xe",
      cell: ({ row }) =>
        isNew && row.original.truckCode === "" ? (
          <Input
            value={row.original?.licensePlate}
            onChange={(e) =>
              handleOnChange({
                id: row.index,
                field: "licensePlate",
                value: e.target.value,
              })
            }
          />
        ) : (
          row.original?.licensePlate
        ),
    },
    {
      accessorKey: "driverName",
      header: "Tên tài xế",
      cell: ({ row }) =>
        isNew && row.original.truckCode === "" ? (
          <Input
            value={row.original?.driverName}
            onChange={(e) =>
              handleOnChange({
                id: row.index,
                field: "driverName",
                value: e.target.value,
              })
            }
          />
        ) : (
          row.original?.driverName
        ),
    },
    {
      accessorKey: "driverPhone",
      header: "Số điện thoại",
      cell: ({ row }) =>
        isNew && row.original.truckCode === "" ? (
          <Input
            value={row.original?.driverPhone}
            onChange={(e) =>
              handleOnChange({
                id: row.index,
                field: "driverPhone",
                value: e.target.value,
              })
            }
          />
        ) : (
          row.original?.driverPhone
        ),
    },
    {
      id: "action",
      header: "Hành động",
      cell: ({ row }) => (
        <Button
          className="bg-white hover:bg-white"
          onClick={() => handleDelete(row.index)}
        >
          <Trash2 size={18} className="text-destructive ml-6" />
        </Button>
      ),
    },
  ];
  return columns;
};
