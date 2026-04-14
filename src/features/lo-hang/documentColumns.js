import { Button } from "@/components/ui/button";
import { Pen } from "lucide-react";

export const getColumns = ({ handleEdit }) => {
  const documentColumns = [
    { accessorKey: "documentCode", header: "Mã chứng từ" },
    {
      id: "stt",
      header: "STT",
      cell: ({ row }) => <div>{row.index + 1}</div>,
    },
    { accessorKey: "documentNumber", header: "Số chứng từ" },
    { accessorKey: "documentType", header: "Loại chứng từ" },
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
