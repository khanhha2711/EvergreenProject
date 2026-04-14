import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import { buildSectionData } from "@/lib/buildSectionData";
import { YeuCauService } from "@/service/yeuCauService";
// const getData = [
//   {
//     requestCode: "YC-2026-001",
//     companyName: "Công ty TNHH Xuất Nhập Khẩu Việt",
//     contactName: "Nguyễn Văn An",
//     contactPhone: "0901234567",
//     custometEmail: "an.nguyen@vinhhanh.com",
//     status: "new",
//     createdAt: "2026-03-22T09:30:00",
//   },
//   {
//     requestCode: "YC-2026-002",
//     companyName: "Công ty Logistics ABC",
//     contactName: "Trần Minh Đức",
//     contactPhone: "0912345678",
//     custometEmail: "duc.tran@abc.com",
//     status: "new",
//     createdAt: "2026-03-21T14:15:00",
//   },
//   {
//     requestCode: "YC-2026-003",
//     companyName: "Công ty Thương mại XYZ",
//     contactName: "Lê Thị Hoa",
//     contactPhone: "0987654321",
//     custometEmail: "hoa.le@xyz.com",
//     status: "watched",
//     createdAt: "2026-03-20T10:00:00",
//   },
//   {
//     requestCode: "YC-2026-004",
//     companyName: "Công ty Vận tải Đông Á",
//     contactName: "Phạm Văn Hùng",
//     contactPhone: "0978123456",
//     custometEmail: "hung.pham@donga.com",
//     status: "watched",
//     createdAt: "2026-03-19T08:45:00",
//   },
// ];
export async function getYeuCau(params) {
  try {
    const res = await YeuCauService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: getData,
      error: error?.response?.data?.messege || "Lỗi hệ thống",
    };
  }
}

export async function deleteYeuCau(id) {
  try {
    const res = await YeuCauService.delete(id);
    console.log(id);
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
    console.log(data);
    return { success: true, data: data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
