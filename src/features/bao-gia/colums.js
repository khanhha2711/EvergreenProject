"use client";

import { Badge } from "@/components/ui/badge";
import { STATEBAOGIA } from "@/constants/bao-gia";
import { Trash } from "lucide-react";

const state = STATEBAOGIA;

export const columns = (actions = {}) => [
  {
    accessorKey: "quotationCode",
    header: "Mã báo giá",
  },

  {
    accessorKey: "customer",
    header: "Khách hàng",
    cell: ({ row }) => {
      const { contactName, companyName } = row.original;

      return (
        <div>
          <div className="font-medium">{contactName}</div>
          <div className="text-sm text-muted-foreground">{companyName}</div>
        </div>
      );
    },
  },

  {
    accessorKey: "employeeName",
    header: "Người tạo",
  },

  {
    accessorKey: "createdAt",
    header: "Ngày bắt đầu",
  },

  {
    accessorKey: "totalPrice",
    header: "Tổng tiền",
    cell: ({ row }) => {
      const amount = row.getValue("totalPrice");

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
    accessorKey: "status",
    header: "Trạng thái",
    cell: ({ row }) => {
      const value = row.getValue("status").toLowerCase();
      const currentState = state.find((s) => s.value === value);

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
