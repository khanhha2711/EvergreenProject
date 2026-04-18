import { SelectComponent } from "@/components/inputs/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pen, Trash2 } from "lucide-react";

export const truckColumn = ({
  isNew,
  handleDelete,
  handleOnChange,
  containerOptions,
  isEdit,
  isCreate,
}) => {
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
        (isNew && row.original.truckCode === "") || isEdit ? (
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
        (isNew && row.original.truckCode === "") || isEdit ? (
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
        (isNew && row.original.truckCode === "") || isEdit ? (
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
      accessorKey: "containerNumber",
      header: "Số container",
      cell: ({ row }) =>
        (isNew && row.original.truckCode === "") || isEdit ? (
          <SelectComponent
            value={row.original?.containerNumber}
            onChange={(value) =>
              handleOnChange({
                id: row.index,
                field: "containerNumber",
                value: value,
              })
            }
            placeHolder="Chọn mã container"
            options={containerOptions}
          />
        ) : (
          row.original?.containerNumber
        ),
    },
  ];
  (!isEdit || !isCreate) &&
    columns.push({
      id: "action",
      header: "Hành động",
      cell: ({ row }) => (
        <div className="flex items-center">
          <Button
            className="bg-white hover:bg-white"
            onClick={() =>
              handleDelete({ id: row.index, code: row.original.truckCode })
            }
          >
            <Trash2 size={18} className="text-destructive" />
          </Button>
        
        </div>
      ),
    });

  return columns;
};
