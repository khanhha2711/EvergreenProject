import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChangeMoney } from "@/lib/changeMoney";
import { Delete, Pen, Trash2 } from "lucide-react";

export const getColumns = ({
  onDelete,
  isNew,
  handleOnChange,
  onEdit,
  isEdit,
  idEdit,
}) => {
  const columns = [
    {
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => {
        return <div className="text-center w-fit ml-4 ">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "serviceName",
      header: "Hạng mục",
      cell: ({ row }) => {
        if (
          (isNew && !row.original.serviceCode) ||
          (isNew && row.original.serviceCode === idEdit)
        ) {
          return (
            <Input
              value={row.original.serviceName ?? ""}
              onChange={(e) =>
                handleOnChange({
                  id: row.index,
                  field: "serviceName",
                  value: e.target.value,
                })
              }
            />
          );
        }
        return row.original.serviceName;
      },
    },
    {
      accessorKey: "unit",
      header: "Đơn vị",
      cell: ({ row }) => {
        if (isNew && !row.original.serviceCode) {
          return (
            <Input
              value={row.original.unit ?? ""}
              onChange={(e) =>
                handleOnChange({
                  id: row.index,
                  field: "unit",
                  value: e.target.value,
                })
              }
            />
          );
        }
        return row.original.unit;
      },
    },
    {
      accessorKey: "price",
      header: "Đơn giá",
      cell: ({ row }) => {
        if (
          (isNew && !row.original.serviceCode) ||
          (isEdit && row.original.serviceCode === idEdit)
        ) {
          return (
            <Input
              value={row.original.price ?? ""}
              onChange={(e) =>
                handleOnChange({
                  id: row.index,
                  field: "price",
                  value: e.target.value,
                })
              }
            />
          );
        }
        return <ChangeMoney amount={row.original.price} />;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex justify-center gap-2">
            {((isNew && !item.serviceCode) || !isNew) && (
              <Button
                className="border-none bg-white hover:bg-white "
                onClick={() => onDelete(item, row.index)}
              >
                <Trash2 className="icon text-destructive" />
              </Button>
            )}
            {!isNew && (
              <Button
                className="border-none bg-white hover:bg-white "
                onClick={() => onEdit(item.serviceCode)}
              >
                <Pen className="icon text-gray-600" />
              </Button>
            )}
          </div>
        );
      },
    },
  ];
  return columns;
};
