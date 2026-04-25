import { SelectComponent } from "@/components/inputs/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SERVICE_UNITS } from "@/constants/dich-vu";
import { ChangeMoney } from "@/lib/changeMoney";
import { Delete, Pen, Trash2 } from "lucide-react";

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
      size: 60,
      cell: ({ row }) => {
        return <div className="px-2">{row.index + 1}</div>;
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
      size: 140,
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
      size: 140,
      cell: ({ row }) => (
        <div>
          {
            SERVICE_UNITS.find((item) => item.value === row.original.unit)
              ?.label
          }
        </div>
      ),
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
      size: 80,
      cell: ({ row }) => {
        const item = row.original;

        return (
          <div className="flex gap-2 items-center justify-center">
            <Button
              className=" bg-white hover:bg-white"
              onClick={() => onDelete?.(item.id)}
            >
              <Trash2 className="text-destructive" />
            </Button>
          </div>
        );
      },
    });
  }

  return baseColumns;
};
