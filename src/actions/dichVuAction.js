import { dichVuService } from "@/service/dichVuService";

// const dichVu = [
//   {
//     serviceCode: "DV-01",
//     serviceName: "Khai báo hải quan",
//     unitPrice: 100000,
//     unit: "luồng",
//   },
//   {
//     serviceCode: "DV-02",
//     serviceName: "Dịch vụ vận chuyển",
//     unitPrice: 200000,
//     unit: "20/40 cont",
//   },
//   {
//     serviceCode: "DV-03",
//     serviceName: "Dịch vụ kiểm hóa",
//     unitPrice: 300000,
//     unit: "20/40 cont",
//   },
//   {
//     serviceCode: "DV-04",
//     serviceName: "Khai báo C/O",
//     unitPrice: 300000,
//     unit: "Bộ bill",
//   },
// ];

export async function getDichVu(params) {
  try {
    const res = await dichVuService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: dichVu,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getDichVuChiTiet(id) {
  try {
    const res = await dichVuService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: detail,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createDichVu(data) {
  try {
    const res = await dichVuService.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateDichVu({ id, data }) {
  try {
    const res = await dichVuService.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function deleteDichVu(id) {
  try {
    const res = await dichVuService.delete({ id });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
