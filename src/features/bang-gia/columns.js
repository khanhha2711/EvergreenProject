import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChangeMoney } from "@/lib/changeMoney";
import { Delete, Pen, Trash2 } from "lucide-react";

export const getColumns = ({ handleEdit }) => {
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
      header: "Tên dịch vụ",
      cell: ({ row }) => {
        return row.original.serviceName;
      },
    },
    {
      accessorKey: "description",
      header: "Mô tả",
      cell: ({ row }) => {
        return row.original.description;
      },
    },
    {
      accessorKey: "unit",
      header: "Đơn vị",
      cell: ({ row }) => {
        return row.original.unit;
      },
    },
    {
      accessorKey: "price",
      header: "Giá tiền",
      cell: ({ row }) => {
        return <ChangeMoney amount={row.original.price} />;
      },
    },
    {
      accessorKey: "status",
      header: "Trạng thái",
      cell: ({ row }) => {
        return <Badge>{row.original.status}</Badge>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const id = row.original.serviceCode;
        return (
          <div className="flex justify-center gap-2">
            <Button
              className="border-none bg-white hover:bg-white "
              onClick={(e) => {
                e.stopPropagation();
                handleEdit(id);
              }}
            >
              <Pen className="icon text-gray-600" />
            </Button>
          </div>
        );
      },
    },
  ];
  return columns;
};
