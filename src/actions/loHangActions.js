import { loHangService } from "@/service/loHangService";

export const employeeData = [
  {
    shipmentCode: "EMP-LOG-001",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
  {
    shipmentCode: "EMP-LOG-002",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
  {
    shipmentCode: "EMP-LOG-003",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
  {
    shipmentCode: "EMP-LOG-004",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
  {
    shipmentCode: "EMP-LOG-005",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
  {
    shipmentCode: "EMP-LOG-006",
    companyName: "Nguyễn Văn Hải",
    origin: "Đà Nẵng",
    destination: "Tokyo",
    etd: "02-04-2026",
    eta: "04-04-2026",
    createdAt: "02-04-2026",
    status: "van chuyen",
  },
];
export const shipmentMockData = {
  shipmentCode: "DH-2024-001",
  contractCode: "HD-2024-001",
  quotationCode: "BG-2024-001",
  origin: "Đà Nẵng",
  destination: "Tokyo",
  etd: "2026-03-10",
  eta: "2026-03-15",
  customer: {
    companyName: "Công ty TNHH Xuất Nhập Khẩu Việt Nam",
    contactName: "Nguyễn Văn B",
    contactPhone: "+84 901 234 567",
    customerEmail: "contact@exporter.vn",
    customerAddress: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh, Việt Nam",
  },
  service: ["Shipping", "Khai báo", "CO", "Kiểm hóa"],
  cargo: {
    cargoName: "Máy tính",
    cargoCategory: "Hàng điện tử",
    grossWeight: 12450, // kg
    cargoValue: 850000000, // VND
    packageCount: 245,
  },
};
export async function getLoHang(params) {
  try {
    const res = await loHangService.list(params);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: employeeData,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getLoHangChiTiet(id) {
  try {
    const res = await loHangService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: shipmentMockData,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
