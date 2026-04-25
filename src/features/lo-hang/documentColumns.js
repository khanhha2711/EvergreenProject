import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

export const getColumns = ({ handleEdit }) => {
  const documentColumns = [
    {
      id: "stt",
      header: "STT",
      size: 60,
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    { accessorKey: "documentCode", header: "Mã chứng từ" },
    { accessorKey: "documentNumber", header: "Số chứng từ" },
    { accessorKey: "documentType", header: "Tên chứng từ" },
    {
      accessorKey: "acttachment",
      header: "File",
      cell: ({ row }) => <div>{row.original?.attachment?.fileName}</div>,
    },
    {
      id: "action",
      header: "Hành động",
      cell: ({ row }) => (
        <Button
          onClick={() => handleEdit(row.original.documentCode)}
          className="flex justify-center text-black bg-white hover:bg-white"
        >
          <Pen />
        </Button>
      ),
    },
  ];
  return documentColumns;
};
