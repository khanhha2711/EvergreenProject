import { CheckCircle, CircleX } from "lucide-react";

export const CONTRACTSTATUS = [
  {
    label: "Có hiệu lực",
    value: "active",
    variant: "default",
    icon: <CheckCircle />,
  },
  {
    label: "Hết hạn",
    value: "done",
    variant: "destructive",
    icon: <CircleX />,
  },
];
