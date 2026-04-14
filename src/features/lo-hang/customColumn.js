export const customColumns = [
  { id: "stt", header: "STT", cell: ({ row }) => <div>{row.index + 1}</div> },
  { accessorKey: "declarationCode", header: "Mã tờ khai" },
  { accessorKey: "declarationNumber", header: "Số tờ khai " },
  { accessorKey: "createdAt", header: "Ngày tạo" },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => <div>{row.original.attachment.name}</div>,
  },
];
