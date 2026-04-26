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
  { label: "Luồng vàng", value: "yellow", variant: "yellow" },
  { label: "Luồng đỏ", value: "red", variant: "destructive" },
];

export const SELECTTITLE = [
  {
    label: "Chuyển luồng",
    value: "CHANGE_LANE",
  },
  { label: "Kiểm tra hồ sơ", value: "CHECK_DOCUMENT" },
  { label: "Kiểm tra hàng hóa", value: "CHECK_GOODS" },
  { label: "Nhận phân luồng", value: "RECEIVE_LANE" },
  { label: "Xử lý với hải quan", value: "PROCESS_LANE" },
  { label: "Tạo tờ khai hải quan", value: "CREATED" },
  { label: "Thông quan", value: "CLEARANCE" },
];

export const SHIPMENT_STEPS = [
  {
    code: "Document Update",
    title: "Cập nhật chứng từ",
    description: "Hoàn tất hồ sơ lô hàng",
    style: "bg-badge-1 text-badge-1-foreground ",
  },
  {
    code: "Customs Declaration",
    title: "Khai báo hải quan",
    description: "Khai báo và kiểm tra chứng từ",
    style: "bg-badge-2 text-badge-2-foreground",
  },
  {
    code: "Clearance",
    title: "Thông quan",
    description: "Kiểm tra và cho phép thông quan",
    style: "bg-badge-3 text-badge-3-foreground",
  },
  {
    code: "Transportation",
    title: "Vận chuyển",
    description: "Đang vận chuyển hàng hóa",
    style: "bg-badge-4 text-badge-4-foreground",
  },
  {
    code: "Completed",
    title: "Hoàn thành",
    description: "Hoàn thành lô hàng",
    style: "bg-chart-5/20 text-chart-5",
  },
];

export const documentOptions = [
  { value: "Commercial Invoice", label: "Commercial Invoice" },
  { value: "Packing List", label: "Packing List" },
  { value: "Bill of Lading", label: "Bill of Lading" },
  { value: "Air Waybill", label: "Air Waybill" },
  { value: "Sales Contract", label: "Sales Contract" },
  { value: "Certificate of Origin", label: "Certificate of Origin" },
  { value: "Customs Declaration", label: "Customs Declaration" },
  { value: "Import License", label: "Import License" },
  { value: "Inspection Certificate", label: "Inspection Certificate" },
  { value: "Insurance Certificate", label: "Insurance Certificate" },
  { value: "Phytosanitary Certificate", label: "Phytosanitary Certificate" },
  { value: "Health Certificate", label: "Health Certificate" },
];
