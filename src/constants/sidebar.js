import { cn } from "@/lib/utils";
import PATH from "@/routes/path";
import {
  Briefcase,
  DollarSign,
  FilePenLine,
  Files,
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
    label: "Yêu cầu báo giá",
    link: PATH.ADMIN.YEUCAU.DANHSACH,
    icon: ({ style }) => <Files className={cn("iconSidebar", style)} />,
  },
  {
    label: "Báo giá",
    link: PATH.ADMIN.BAOGIA.DANHSACH,
    icon: ({ style }) => <FileText className={cn("iconSidebar", style)} />,
  },
  {
    label: "Hợp đồng",
    link: PATH.ADMIN.HOPDONG.DANHSACH,
    icon: ({ style }) => <FilePenLine className={cn("iconSidebar", style)} />,
  },
  {
    label: "Lô hàng",
    link: PATH.ADMIN.LOHANG.DANHSACH,
    icon: ({ style }) => <Package className={cn("iconSidebar", style)} />,
  },

  {
    label: "Vận tải",
    link: PATH.ADMIN.VANTAI.DANHSACH,
    icon: ({ style }) => <Truck className={cn("iconSidebar", style)} />,
  },
  {
    label: "Dịch vụ",
    link: PATH.ADMIN.DICHVU,
    icon: ({ style }) => <Briefcase className={cn("iconSidebar", style)} />,
  },
  {
    label: "Khách hàng",
    link: PATH.ADMIN.KHACHHANG.DANHSACH,
    icon: ({ style }) => <Users className={cn("iconSidebar", style)} />,
  },
  {
    label: "Nhân viên",
    link: PATH.ADMIN.NHANVIEN,
    icon: ({ style }) => <FileUser className={cn("iconSidebar", style)} />,
  },
];
