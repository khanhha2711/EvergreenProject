import { vanTaiHangTau, vanTaiNoiDia } from "@/service/vanTaiService";

// const dataNoiDia = {
//   truckingName: "Công ty TNHH Vận Tải ABC",
//   truckingPhone: "0123456789",
//   truckingEmail: "info@abc.com",
//   truckingAddress: "123 Đường ABC, Quận XYZ, TP. HCM",
// };

// const dataHangTau = {
//   shippingLineName: "Công ty TNHH Vận Tải Hàng Tàu XYZ",
//   shippingLineEmail: "info@xyz.com",
// };

// const vanTaiNoiDiaData = [
//   {
//     truckingCode: "ND-2025-00125",
//     truckingName: "Công ty TNHH Thương Mại EverGreen",
//     truckingPhone: "0123456789",
//     truckingEmail: "abc123@gmail.com",
//     truckingAddress: "Ngũ Hành Sơn, Đà Nẵng",
//   },
//   {
//     truckingCode: "ND-2025-00126",
//     truckingName: "Công ty TNHH Logistics Việt Nam",
//     truckingPhone: "0987654321",
//     truckingEmail: "logistics@gmail.com",
//     truckingAddress: "Hải Châu, Đà Nẵng",
//   },
//   {
//     truckingCode: "ND-2025-00127",
//     truckingName: "Công ty Cổ phần Xuất Nhập Khẩu An Phát",
//     truckingPhone: "0911222333",
//     truckingEmail: "anphat@gmail.com",
//     truckingAddress: "Thanh Khê, Đà Nẵng",
//   },
//   {
//     truckingCode: "ND-2025-00128",
//     truckingName: "Công ty TNHH Vận Tải Biển Đông",
//     truckingPhone: "0933444555",
//     truckingEmail: "biendong@gmail.com",
//     truckingAddress: "Sơn Trà, Đà Nẵng",
//   },
//   {
//     truckingCode: "ND-2025-00129",
//     truckingName: "Công ty TNHH Dịch Vụ Toàn Cầu",
//     truckingPhone: "0966777888",
//     truckingEmail: "global@gmail.com",
//     truckingAddress: "Liên Chiểu, Đà Nẵng",
//   },
// ];
// const vanTaiHangTauData = [
//   {
//     shippingLineCode: "HT-2025-00125",
//     shippingLineName: "Công ty TNHH Thương Mại EverGreen",
//     shippingLineEmail: "abc123@gmail.com",
//   },
//   {
//     shippingLineCode: "HT-2025-00126",
//     shippingLineName: "Công ty TNHH Logistics Việt Nam",
//     shippingLineEmail: "logistics@gmail.com",
//   },
//   {
//     shippingLineCode: "HT-2025-00127",
//     shippingLineName: "Công ty Cổ phần Xuất Nhập Khẩu An Phát",
//     shippingLineEmail: "anphat@gmail.com",
//   },
//   {
//     shippingLineCode: "HT-2025-00128",
//     shippingLineName: "Công ty TNHH Vận Tải Biển Đông",
//     shippingLineEmail: "biendong@gmail.com",
//   },
//   {
//     shippingLineCode: "HT-2025-00129",
//     shippingLineName: "Công ty TNHH Dịch Vụ Toàn Cầu",
//     shippingLineEmail: "global@gmail.com",
//   },
// ];
export async function getVanTaiNoiDia(params) {
  try {
    const res = await vanTaiNoiDia.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: vanTaiNoiDiaData, //test
      error: error?.response?.data?.messege || "Lỗi hệ thống",
    };
  }
}

export async function createVanTaiNoiDia(data) {
  try {
    const res = await vanTaiNoiDia.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
export async function updateVanTaiNoiDia({ id, data }) {
  try {
    const res = await vanTaiNoiDia.update({ id, data });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
export async function detailVanTaiNoiDia(id) {
  try {
    const res = await vanTaiNoiDia.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: dataNoiDia, //test
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getVanTaiHangTau(params) {
  try {
    const res = await vanTaiHangTau.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: vanTaiHangTauData, //test
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createVanTaiHangTau(data) {
  try {
    const res = await vanTaiHangTau.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function detailVanTaiHangTau(id) {
  try {
    const res = await vanTaiHangTau.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: dataHangTau, //test
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateVanTaiHangTau({ id, data }) {
  try {
    const res = await vanTaiHangTau.update({ id, data });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
