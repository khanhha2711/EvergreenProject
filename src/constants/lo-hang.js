import {
  CheckCircle,
  CircleCheckBig,
  CircleX,
  Clock,
  Edit2,
  Send,
} from "lucide-react";

export const STATELOHANG = [
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
    value: "contracted",
    variant: "success",
  },
  { icon: <Send />, label: "Đã gửi", value: "send", variant: "new" },
];

export const DOCUMENTFIELDS = [
  { label: "Mã chứng từ", name: "documentCode" },
  {
    label: "Loại chứng từ",
    name: "documentType",
    placeholder: "Nhập loại chứng từ",
  },
  {
    label: "Số chứng từ",
    name: "documentNumber",
    placeholder: "Nhập số chứng từ",
  },
  { label: "Ngày tạo", name: "createdAt" },
  {
    label: "File",
    name: "attachment",
  },
];

export const CUSTOMFIELDS = [
  { label: "Mã tờ khai", name: "declarationCode" },
  { label: "Số tờ khai", name: "declarationNumber", placeholder: "Nhập số tờ khai" },
  { label: "Ngày khai báo", name: "createdAt", placeholder: "Chọn ngày khai báo" },
  {
    label: "Phân luồng hải quan",
    name: "lane",
    placeholder: "Chọn phân luồng",
    options: [
      { label: "Luồng xanh", value: "green" },
      { label: "Luồng vàng", value: "yellow" },
      { label: "Luồng đỏ", value: "red" },
    ],
  },
];

const SHIPFIELDS = [{ label: "Mã booking", name: "bookingCode" },{}];

