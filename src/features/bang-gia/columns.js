import { StatusDropdown } from "@/components/inputs/dropdown";
import { SelectComponent } from "@/components/inputs/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_UNITS } from "@/constants/dich-vu";
import { ChangeMoney } from "@/lib/changeMoney";
import { cn } from "@/lib/utils";
import { Delete, Pen, Trash2 } from "lucide-react";
export const STATUS = [
  { label: "Hoạt động", value: "ACTIVE" },
  { label: "Ngừng hoạt đông", name: "INACTIVE" },
];
export const getColumns = ({ handleOnChange }) => {
  const columns = [
    {
      accessorKey: "id",
      header: "STT",
      size: 60,
      cell: ({ row }) => {
        return <div className="text-center w-fit ml-2 ">{row.index + 1}</div>;
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
        return (
          <div>
            {
              SERVICE_UNITS.find((item) => item.value === row.original.unit)
                ?.label
            }
          </div>
        );
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
      size: 100,
      cell: ({ row }) => {
        return (
          <StatusDropdown
            status={row.original.status}
            onChange={(value) =>
              handleOnChange({ id: row.original.serviceCode, value })
            }
          />
        );
      },
    },
  ];
  return columns;
};
