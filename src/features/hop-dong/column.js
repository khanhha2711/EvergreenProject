import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CONTRACTSTATUS } from "@/constants/hop-dong";
import { format } from "date-fns";
import { Download, Eye } from "lucide-react";

export const columns = ({ handleDownload, pageSize, page }) => {
  return [
    {
      accessorKey: "id",
      header: "STT",
      cell: ({ row }) => {
        return <div>{pageSize * (page - 1) + row.index + 1}</div>;
      },
    },
    { accessorKey: "contractCode", header: "Mã hợp đồng" },
    { accessorKey: "quotationCode", header: "Mã báo giá" },
    {
      accessorKey: "signedDate",
      header: "Ngày kí",
      cell: ({ row }) => {
        return <div> {format(row.original.signedDate, "dd/MM/yyyy")}</div>;
      },
    },
    {
      accessorKey: "expiredDate",
      header: "Ngày hết hạn",
      cell: ({ row }) => {
        return <div> {format(row.original.expiredDate, "dd/MM/yyyy")}</div>;
      },
    },
    {
      accessorKey: "contractStatus",
      header: "Trạng thái",
      cell: ({ row }) => {
        const value = row.getValue("contractStatus").toLowerCase();
        const currentState = CONTRACTSTATUS.find((s) => s.value === value);

        if (!currentState) return null;

        return (
          <Badge
            variant={currentState.variant}
            className="flex items-center gap-2"
          >
            {currentState.icon}
            {currentState.label}
          </Badge>
        );
      },
    },
  ];
};

export const columnFile = [
  {
    accessorKey: "id",
    header: "STT",
    cell: ({ row }) => {
      return <div>{row.index + 1}</div>;
    },
  },
  { accessorKey: "contractCode", header: "Mã hợp đồng" },
  { accessorKey: "fileName", header: "Tên file" },
  { accessorKey: "createdAt", header: "Ngày tải" },
  {
    id: "fileUrl",
    cell: ({ row }) => {
      const url = row.original.fileUrl;
      return (
        <a href={url} target="_blank" rel="noopener noreferrer">
          <Eye size={18} className="text-gray-500" />
        </a>
      );
    },
  },
];
