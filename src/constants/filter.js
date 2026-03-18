import { CircleCheckBig, CircleX, Clock, Send } from "lucide-react";

export const STATES = [
  { label: "Tất cả", value: "All" },
  { icon: <Clock />, label: "Nháp", value: "draft", variant: "secondary" },
  {
    icon: <CircleCheckBig />,
    label: "Đã chấp nhận",
    value: "approved",
    variant: "default",
  },
  {
    icon: <CircleX />,
    label: "Từ chối",
    value: "rejected",
    variant: "destructive",
  },
  { icon: <Send />, label: "Đã gửi", value: "send", variant: "new" },
];
