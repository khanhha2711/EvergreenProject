import { Building2, User, Mail, Phone, Hash, MapPin, Map } from "lucide-react";

export const CUSTOMER_FIELDS = [
  {
    label: "Tên công ty",
    name: "companyName",
    icon: <Building2 className="icon" />,
    placeholder: "Nhập tên công ty",
  },
  {
    label: "Người liên hệ",
    name: "contactName",
    icon: <User className="icon" />,
    placeholder: "Nhập tên người liên hệ",
  },
  {
    label: "Email",
    name: "customerEmail",
    icon: <Mail className="icon" />,
    placeholder: "example@email.com",
  },
  {
    label: "Số điện thoại",
    name: "contactPhone",
    icon: <Phone className="icon" />,
    placeholder: "Nhập số điện thoại",
  },
  {
    label: "Mã số thuế",
    name: "taxCode",
    icon: <Hash className="icon" />,
    placeholder: "Nhập mã số thuế",
  },
  {
    label: "Địa chỉ",
    name: "customerAddress",
    icon: <MapPin className="icon" />,
    placeholder: "Nhập địa chỉ",
  },
];
