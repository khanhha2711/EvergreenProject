import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import { buildSectionData } from "@/lib/buildSectionData";
import { YeuCauService } from "@/service/yeuCauService";

export async function getYeuCau(params) {
  try {
    const res = await YeuCauService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.messege || "Lỗi hệ thống",
    };
  }
}

export async function deleteYeuCau(id) {
  try {
    const res = await YeuCauService.delete(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function detailYeuCau(id) {
  try {
    const res = await YeuCauService.detail(id);
    const data = {
      id: res.data.requestCode,
      customer: buildSectionData({
        fields: CUSTOMER_FIELDS,
        rawData: res.data,
      }),
      cargo: buildSectionData({
        fields: CARGOFIELDS,
        rawData: res.data,
      }),
      shipping: buildSectionData({
        fields: SHIPMENT_FIELDS,
        rawData: res.data,
      }),
      service: res.data.serviceCode,
    };
    return { success: true, data: data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
