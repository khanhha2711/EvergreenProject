import { cn } from "./utils";

export function ChangeMoney({ amount, style }) {
  const change = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return <p className={cn(style === "bold" && "font-bold")}>{change}</p>;
}
