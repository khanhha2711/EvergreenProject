"use server";
import { baoGiaService } from "@/service/baoGiaService";

export async function getBaoGia(params) {
  try {
    const res = await baoGiaService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getBaoGiaChiTiet(id) {
  try {
    const res = await baoGiaService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateBaoGia({ id, data }) {
  try {
    const res = await baoGiaService.update({ id, data });
    return { success: true };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function deleteBaoGia(id) {
  try {
    await baoGiaService.delete(id);
    return { success: true };
  } catch (error) {
    return { success: false, error: "Lỗi hệ thống" };
  }
}

export async function updateState({ id, state }) {
  try {
    const res = await baoGiaService.updateState({ id, state });
    return { success: true, data: res.data.state };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createBaoGia(id) {
  try {
    const res = await baoGiaService.create(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
