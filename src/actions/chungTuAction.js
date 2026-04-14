import { chungTuService } from "@/service/chungTuService";

const data = [
  {
    documentCode: "134",
    documentNumber: "1244",
    documentType: "sfad",
    attachment: { fileName: "ádfghj" },
  },
];
export async function getChungTu(id) {
  try {
    const res = await chungTuService.list(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: data,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createChungTu({ id, formData }) {
  try {
    const res = await chungTuService.create({ id, formData });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateChungTu({ id, data }) {
  try {
    const res = await chungTuService.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function deleteChungTu(id) {
  try {
    const res = await chungTuService.delete({ id });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function detailChungTu(id) {
  try {
    const res = await chungTuService.detail(id);
    console.log("data", res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
