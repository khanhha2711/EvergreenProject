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
  {
    label: "Chi cục hải quan",
    name: "customsBranch",
    placeholder: "Nhập chi cục hải quan",
  },
  {
    label: "Số tờ khai",
    name: "declarationNumber",
    placeholder: "Nhập số tờ khai",
  },
  {
    label: "Ngày khai báo",
    name: "declarationDate",
    placeholder: "Chọn ngày khai báo",
  },
];

export const SHIPPINGFIELDS = [
  {
    label: "Số booking",
    name: "bookingNumber",
    placeholder: "Nhập số booking",
  },
  {
    label: "Hãng vận chuyển",
    name: "shippingName",
    placeholder: "Chọn hãng vận chuyển",
  },
  { label: "Tên tàu", name: "vesselName", placeholder: "Nhập tên tàu" },
  { label: "Cảng đi", name: "portOfLoading", placeholder: "Nhập tên cảng đi" },
  {
    label: "Cảng đến",
    name: "portOfDischarge",
    placeholder: "Nhập tên cảng đi",
  },
];

export const LANE = [
  { label: "Luồng xanh", value: "green", variant: "primary" },
  { label: "Luồng vàng", value: "yellow", variant: "destructive" },
  { label: "Luồng đỏ", value: "red", variant: "yellow" },
];

export const SELECTTITLE = [
  { label: "Nhận phân luồng", value: "RECEIVE_LANE" },
  {
    label: "Chuyển luồng",
    value: "CHANGE_LANE",
  },
  { label: "Xử lý với hải quan", value: "PROCESS_LANE" },
  { label: "Thông quan", value: "CLEARANCE" },
];
