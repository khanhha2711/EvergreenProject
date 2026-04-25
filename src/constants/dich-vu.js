import { getDichVu } from "@/actions/dichVuAction";

export const getServiceFields = async () => {
  const res = await getDichVu();
  const data = res.data;

  const services =
    data?.map((service) => ({
      value: service.serviceCode,
      label: service.serviceName,
    })) || "";
  return services;
};

export const SERVICEFIELDS = [
  {
    name: "serviceName",
    label: "Tên dịch vụ",
    placeholder: "Nhập tên dịch vụ",
  },
  {
    name: "price",
    label: "Giá tiền",
    placeholder: "Nhập giá tiền",
  },
  {
    name: "unit",
    label: "Đơn vị",
    placeholder: "Nhập tên đơn vụ",
  },
  { name: "description", label: "Mô tả", placeholder: "Nhập tên dịch vụ" },
  {
    name: "Trạng thái",
    label: "status",
  },
];

export const SERVICE_UNITS = [
  //  Container / vận tải
  { label: "Container", value: "cont" },
  { label: "Container 20'", value: "20' cont" },
  { label: "Container 40'", value: "40' cont" },
  { label: "Chuyến xe", value: "TRIP" },
  { label: "Lô hàng ", value: "SHIPMENT" },

  //  Số lượng hàng
  { label: "Kiện ", value: "PKG" },
  { label: "Thùng", value: "CARTON" },
  { label: "Pallet", value: "PALLET" },

  //  Khối lượng / thể tích
  { label: "Kg", value: "KG" },
  { label: "Tấn", value: "TON" },
  { label: "CBM (m³)", value: "CBM" },

  //  Chứng từ
  { label: "Bộ chứng từ", value: "SET" },
  { label: "Tờ khai hải quan", value: "DECLARATION" },
  { label: "Bill ", value: "BILL" },
  { label: "C/O", value: "CO" },

  { label: "Lần", value: "TIME" },
  { label: "Ngày", value: "DAY" },
  { label: "Giờ", value: "HOUR" },
];
