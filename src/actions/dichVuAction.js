import { dichVuService } from "@/service/dichVuService";

const dichVu = [
  {
    serviceCode: "DV-01",
    serviceName: "Khai báo hải quan",
    description: "sssssss",
    price: 100000,
    unit: "luồng",
    status: "pending",
  },
  {
    serviceCode: "DV-02",
    serviceName: "Dịch vụ vận chuyển",
    description: "sssssss",
    price: 200000,
    unit: "20/40 cont",
    status: "pending",
  },
  {
    serviceCode: "DV-03",
    serviceName: "Dịch vụ kiểm hóa",
    description: "sssssss",
    price: 300000,
    unit: "20/40 cont",
    status: "pending",
  },
  {
    serviceCode: "DV-04",
    serviceName: "Khai báo C/O",
    description: "sssssss",
    price: 300000,
    unit: "Bộ bill",
    status: "pending",
  },
];

export async function getDichVu(params) {
  try {
    const res = await dichVuService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      data: dichVu,
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
      data: dichVu[0],
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

export async function updateDichVu(data) {
  try {
    const res = await dichVuService.update(data);
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
    const res = await dichVuService.delete(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
