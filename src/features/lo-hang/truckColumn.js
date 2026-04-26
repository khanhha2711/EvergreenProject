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
  handleEdit,
  idEdit,
}) => {
  const columns = [
    {
      id: "stt",
      header: "STT",
      size: 60,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    {
      accessorKey: "licensePlate",
      header: "Biển số xe",
      cell: ({ row }) =>
        (isNew && row.original.truckCode === "") ||
        (isEdit && idEdit === row.original.truckCode) ? (
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
        (isNew && row.original.truckCode === "") ||
        (isEdit && idEdit === row.original.truckCode) ? (
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
        (isNew && row.original.truckCode === "") ||
        (isEdit && idEdit === row.original.truckCode) ? (
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
        (isNew && row.original.truckCode === "") ||
        (isEdit && idEdit === row.original.truckCode) ? (
          <SelectComponent
            value={row.original?.containerNumber}
            onChange={(value) =>
              handleOnChange({
                id: row.index,
                field: "containerNumber",
                value: value,
              })
            }
            placeHolder="Chọn số container"
            options={containerOptions}
          />
        ) : (
          row.original?.containerNumber
        ),
    },
  ];

  columns.push({
    id: "action",
    header: "Hành động",
    cell: ({ row }) => (
      <div className="flex items-center">
        {((!isEdit && !isCreate) ||
          (isNew && row.original.truckCode === "")) && (
          <Button
            className="bg-white hover:bg-white"
            onClick={() =>
              handleDelete({ id: row.index, code: row.original.truckCode })
            }
          >
            <Trash2 size={18} className="text-destructive" />
          </Button>
        )}
        {!isNew && (
          <Button
            onClick={() => handleEdit(row.original.truckCode)}
            className="bg-white hover:bg-white text-gray-600"
          >
            <Pen />
          </Button>
        )}
      </div>
    ),
  });

  return columns;
};

export const truckDetailColumns = [
  {
    id: "stt",
    header: "STT",
    size: 60,
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "licensePlate",
    header: "Biển số xe",
  },
  {
    accessorKey: "driverName",
    header: "Tên tài xế",
  },
  {
    accessorKey: "driverPhone",
    header: "Số điện thoại",
  },
  {
    accessorKey: "containerNumber",
    header: "Số container",
  },
];
