import { cn } from "./utils";

export function ChangeMoney({ amount, style, size }) {
  const change = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
  return (
    <p className={cn(style === "bold" && "font-bold", `text-${size}`)}>
      {change}
    </p>
  );
}
