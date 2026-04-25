import { loHangService } from "@/service/loHangService";

export async function getLoHang(params) {
  try {
    const res = await loHangService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
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
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateLoHang({ id, data }) {
  try {
    const res = await loHangService.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getLoHangDashboard(id) {
  try {
    const res = await loHangService.dashboard(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
