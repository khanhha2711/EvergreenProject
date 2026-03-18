"use client";

import { Badge } from "@/components/ui/badge";
import { STATES } from "@/constants/filter";
import { Trash } from "lucide-react";

const states = STATES;

export const columns = (actions = {}) => [
  {
    accessorKey: "id",
    header: "Mã báo giá",
  },

  {
    accessorKey: "customer",
    header: "Khách hàng",
    cell: ({ row }) => {
      const { customer, company } = row.original;

      return (
        <div>
          <div className="font-medium">{customer}</div>
          <div className="text-sm text-muted-foreground">{company}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "creater",
    header: "Người tạo",
  },

  {
    accessorKey: "dateStart",
    header: "Ngày bắt đầu",
  },

  {
    accessorKey: "sum",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const amount = row.getValue("sum");

      return (
        <div className="font-medium">
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(amount)}
        </div>
      );
    },
  },

  {
    accessorKey: "state",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value = row.getValue("state");
      const state = states.find((s) => s.value === value);

      if (!state) return null;

      return (
        <Badge variant={state.variant} className="flex items-center gap-2">
          {state.icon}
          {state.label}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Action",
    cell: ({ row }) => {
      const value = row.getValue("state");

      return (
        <div
          className="flex justify-center items-center"
          onClick={(e) => e.stopPropagation()}
        >
          {value === "draft" && (
            <Trash
              size={18}
              className="cursor-pointer text-red-500"
              onClick={() => actions.onDelete?.(row.original.id)}
            />
          )}
        </div>
      );
    },
  },
];
