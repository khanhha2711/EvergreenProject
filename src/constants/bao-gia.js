import {
  CheckCircle,
  CircleCheckBig,
  CircleX,
  Clock,
  Edit2,
  Send,
} from "lucide-react";

export const STATEBAOGIA = [
  { label: "Tất cả", value: "all" },
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
  {
    icon: <CheckCircle />,
    label: "Hoàn thành",
    value: "done",
    variant: "done",
  },
  { icon: <Send />, label: "Đã gửi", value: "send", variant: "new" },
];
