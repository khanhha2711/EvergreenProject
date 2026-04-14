import { SelectComponent } from "@/components/inputs/select";
import { Input } from "@/components/ui/input";
import { ChangeMoney } from "@/lib/changeMoney";
import { Delete, Pen } from "lucide-react";

export const getColumns = ({
  onDelete,
  showActions = true,
  isNew,
  handleOnChange,
  serviceFields,
}) => {
  const baseColumns = [
    {
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => {
        return <div className="text-center">{row.index + 1}</div>;
      },
    },
    {
      accessorKey: "name",
      header: "Hạng mục",
      cell: ({ row }) => {
        if (isNew && !row.original.id) {
          return (
            <SelectComponent
              placeholder={"Chọn dịch vụ"}
              options={serviceFields}
              onChange={(e) =>
                handleOnChange({
                  id: row.index,
                  field: "id",
                  value: e,
                })
              }
            />
          );
        }
        return row.original.name;
      },
    },
    {
      accessorKey: "quantity",
      header: "Số lượng",
      cell: ({ row }) => {
        if (showActions) {
          return (
            <Input
              value={row.original.quantity ?? ""}
              onChange={(e) =>
                handleOnChange({
                  id: row.index,
                  field: "quantity",
                  value: e.target.value,
                })
              }
            />
          );
        }
        return row.original.quantity;
      },
    },
    {
      accessorKey: "unit",
      header: "Đơn vị",
    },
    {
      accessorKey: "unitPrice",
      header: "Đơn giá",
      cell: ({ row }) => <ChangeMoney amount={row.original.unitPrice} />,
    },
    {
      accessorKey: "total",
      header: "Thành tiền",
      cell: ({ row }) => <ChangeMoney amount={row.original.total} />,
    },
  ];

  if (showActions) {
    baseColumns.push({
      id: "actions",
      header: "Hành động",
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-2">
            <button onClick={() => onDelete?.(item.serviceCode)}>
              <Delete className="icon" />
            </button>
          </div>
        );
      },
    });
  }

  return baseColumns;
};
