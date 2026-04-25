import { nhanVienService } from "@/service/nhanVienService";

export async function getNhanVien(params) {
  try {
    const res = await nhanVienService.list(params);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getNhanVienChiTiet(id) {
  try {
    const res = await nhanVienService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createNhanVien(data) {
  try {
    const res = await nhanVienService.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateNhanVien({ id, data }) {
  try {
    const res = await nhanVienService.update({ id, data });
    console.log(res);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
