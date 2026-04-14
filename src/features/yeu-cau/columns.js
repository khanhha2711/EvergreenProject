import { Badge } from "@/components/ui/badge";
import { STATEYEUCAU } from "@/constants/yeu-cau";
import { Trash } from "lucide-react";

export const columns = ({ handleDelete }) => [
  {
    accessorKey: "requestCode",
    header: "Mã YC",
  },
  {
    accessorKey: "companyName",
    header: "Tên công ty",
  },
  {
    accessorKey: "contactName",
    header: "Người đại diện",
  },
  {
    id: "contact",
    header: "SDT / Email",
    cell: ({ row }) => {
      const { contactPhone, customerEmail } = row.original;
      return (
        <div>
          <div>{contactPhone}</div>
          <div className="text-gray-500 text-sm">{customerEmail}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const state = row.original.status.toLowerCase();
      const currentState = STATEYEUCAU.find((s) => s.value === state);
      return (
        <Badge
          variant={currentState?.variant}
          className="flex items-center gap-2"
        >
          {currentState?.icon}
          {currentState?.label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Ngày tạo",
    cell: ({ row }) => {
      return row.original.createdAt;
    },
  },
];
