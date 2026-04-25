import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const statusOptions = [
  {
    label: "Hoạt động",
    value: "ACTIVE",
    className: "bg-badge-4 text-badge-4-foreground",
  },
  {
    label: "Tạm dừng",
    value: "INACTIVE",
    className: "bg-badge-1 text-badge-1-foreground ",
  },
];

export function StatusDropdown({ status, onChange }) {
  const current = statusOptions.find((item) => item.value === status);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Badge
          className={cn(
            `cursor-pointer ${current?.className} flex gap-2`,
          )}
        >
          <div
            className={`w-2 h-2 rounded-full ${
              current?.value === "ACTIVE"
                ? "bg-badge-4-foreground"
                : "text-badge-1-foreground"
            } `}
          ></div>
          <p className="text-xs font-medium">{current?.label} </p>
          <ChevronDown />
        </Badge>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        {statusOptions.map((item) => (
          <DropdownMenuItem
            key={item.value}
            onClick={(e) => {
              e.stopPropagation(), onChange(item.value);
            }}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
