import { baoGiaService } from "@/service/baoGiaService";
import { khachHangService } from "@/service/khachHangService";
import { sendEmailService } from "@/service/sendEmailService";

export async function getKhachHang(params) {
  try {
    const res = await khachHangService.list(params);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getKhachHangChiTiet(id) {
  try {
    const res = await khachHangService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createKhachHang(data) {
  try {
    const res = await khachHangService.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateKhachHang({ id, data }) {
  try {
    const res = await khachHangService.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
