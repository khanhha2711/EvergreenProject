import { haiQuanService } from "@/service/haiQuanService";

export async function createHaiQuan({ id, formData }) {
  try {
    const res = await haiQuanService.create({ id, formData });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateHaiQuan({ id, data }) {
  try {
    const res = await haiQuanService.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function detailHaiQuan(id) {
  try {
    const res = await haiQuanService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
