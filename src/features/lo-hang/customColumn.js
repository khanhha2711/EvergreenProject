import { SelectComponent } from "@/components/inputs/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CONTAINER } from "@/constants/form";
import { Trash2 } from "lucide-react";

export const containerViewColumns = [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "containerNumber",
    header: "Số container",
  },
  {
    accessorKey: "sealNumber",
    header: "Số seal",
  },
  {
    accessorKey: "containerType",
    header: "Loại container",
  },
];

export const containerColumns = ({ isNew, handleDelete, handleOnChange }) => [
  {
    id: "stt",
    header: "STT",
    cell: ({ row }) => <div>{row.index + 1}</div>,
  },
  {
    accessorKey: "containerNumber",
    header: "Số container",
    cell: ({ row }) =>
      isNew ? (
        <Input
          value={row.original?.containerNumber || ""}
          onChange={(e) =>
            handleOnChange({
              id: row.index,
              field: "containerNumber",
              value: e.target.value,
            })
          }
        />
      ) : (
        <span>{row.original?.containerNumber || "-"}</span>
      ),
  },
  {
    accessorKey: "sealNumber",
    header: "Số seal",
    cell: ({ row }) =>
      isNew ? (
        <Input
          value={row.original?.sealNumber || ""}
          onChange={(e) =>
            handleOnChange({
              id: row.index,
              field: "sealNumber",
              value: e.target.value,
            })
          }
        />
      ) : (
        <span>{row.original?.sealNumber || "-"}</span>
      ),
  },
  {
    accessorKey: "containerType",
    header: "Loại container",
    cell: ({ row }) =>
      isNew ? (
        <SelectComponent
          placeholder={"Chọn loại container"}
          options={CONTAINER}
          onChange={(value) =>
            handleOnChange({
              id: row.index,
              field: "containerType",
              value: value,
            })
          }
        />
      ) : (
        <span>{row.original?.containerType || "-"}</span>
      ),
  },
  {
    id: "action",
    header: "Hành động",
    cell: ({ row }) => (
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => handleDelete(row.index)}
      >
        <Trash2 className="text-destructive" />
      </Button>
    ),
  },
];
