import { CheckCircle, Clock } from "lucide-react";

export const STATEYEUCAU = [
  { value: "all", label: "Tất cả" },
  { value: "done", label: "Hoàn tất", variant: "new", icon: <CheckCircle /> },
  { value: "new", label: "Mới", variant: "secondary", icon: <Clock /> },
];
