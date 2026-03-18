import PATH from "@/routes/path";
import {
  DollarSign,
  FilePenLine,
  FileText,
  FileUser,
  Package,
  Receipt,
  ShieldCheck,
  Truck,
  Users,
} from "lucide-react";

export const SIDEBAR = [
  {
    label: "Báo giá",
    link: PATH.ADMIN.BAOGIA.DANHSACH,
    icon: <FileText className="iconSidebar" />,
  },
  {
    label: "Hợp đồng",
    link: PATH.ADMIN.HOPDONG,
    icon: <FilePenLine className="iconSidebar" />,
  },
  {
    label: "Lô hàng",
    link: PATH.ADMIN.LOHANG,
    icon: <Package className="iconSidebar" />,
  },
  {
    label: "Hóa đơn",
    link: PATH.ADMIN.HOADON,
    icon: <DollarSign className="iconSidebar" />,
  },
  {
    label: "Phiếu thu",
    link: PATH.ADMIN.PHIEUTHU,
    icon: <Receipt className="iconSidebar" />,
  },
  {
    label: "Vận tải",
    link: PATH.ADMIN.VANTAI,
    icon: <Truck className="iconSidebar" />,
  },
  {
    label: "Khách hàng",
    link: PATH.ADMIN.KHACHHANG,
    icon: <Users className="iconSidebar" />,
  },
  {
    label: "Nhân viên",
    link: PATH.ADMIN.NHANVIEN,
    icon: <FileUser className="iconSidebar" />,
  },
  {
    label: "Tài khoản",
    link: PATH.ADMIN.TAIKHOAN,
    icon: <ShieldCheck className="iconSidebar" />,
  },
];
