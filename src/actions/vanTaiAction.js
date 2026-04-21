import {
  container,
  datTau,
  vanChuyenNoiDia,
  vanTaiHangTau,
  vanTaiNoiDia,
} from "@/service/vanTaiService";

export async function getVanTaiNoiDia(params) {
  try {
    const res = await vanTaiNoiDia.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
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

export async function optionSelect() {
  try {
    const res = await vanTaiNoiDia.select();
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getVanChuyenNoiDia(id) {
  try {
    const res = await vanChuyenNoiDia.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createVanChuyenNoiDia({ id, data }) {
  try {
    const res = await vanChuyenNoiDia.create({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateVanChuyenNoiDia({ id, data }) {
  try {
    const res = await vanChuyenNoiDia.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function deleteVanChuyenNoiDia(id) {
  try {
    const res = await vanChuyenNoiDia.delete(id);

    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getDatTau(id) {
  try {
    const res = await datTau.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createDatTau({ id, data }) {
  try {
    const res = await datTau.create({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateDatTau({ id, data }) {
  try {
    const res = await datTau.update({ id, data });
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function selectContainer(id) {
  try {
    const res = await container.select(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function selectShippingCompany() {
  try {
    const res = await vanTaiHangTau.select();
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
