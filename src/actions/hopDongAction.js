import { HopDongService } from "@/service/hopDongService";

export async function getHopDong(params) {
  try {
    const res = await HopDongService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getHopDongChiTiet(id) {
  try {
    const res = await HopDongService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createHopDong(formData) {
  try {
    const res = await HopDongService.create(formData);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
