"use server";
import { baoGiaService } from "@/service/baoGiaService";
// const getData = [
//   {
//     quotationCode: "BG001",
//     contactName: "Công ty ABC",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Nguyễn Hà",
//     createdAt: "2026-03-01",
//     totalPrice: 15000000,
//     status: "draft",
//   },
//   {
//     quotationCode: "BG002",
//     contactName: "Công ty XYZ",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Trần Minh",
//     createdAt: "2026-03-03",
//     totalPrice: 23000000,
//     status: "rejected",
//   },
//   {
//     quotationCode: "BG003",
//     contactName: "Công ty Hoàng Long",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Lê Anh",
//     createdAt: "2026-03-05",
//     totalPrice: 7800000,
//     status: "approved",
//   },
//   {
//     quotationCode: "BG004",
//     contactName: "Công ty Thành Công",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Nguyễn Hà",
//     createdAt: "2026-03-06",
//     totalPrice: 45000000,
//     status: "contracted",
//   },
//   {
//     quotationCode: "BG005",
//     contactName: "Công ty Đông Á",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Phạm Hùng",
//     createdAt: "2026-03-07",
//     totalPrice: 12800000,
//     status: "send",
//   },
//   {
//     quotationCode: "BG006",
//     contactName: "Công ty ABC",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Nguyễn Hà",
//     createdAt: "2026-03-01",
//     totalPrice: 15000000,
//     status: "draft",
//   },
//   {
//     quotationCode: "BG007",
//     contactName: "Công ty XYZ",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Trần Minh",
//     createdAt: "2026-03-03",
//     totalPrice: 23000000,
//     status: "rejected",
//   },
//   {
//     quotationCode: "BG008",
//     contactName: "Công ty Hoàng Long",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Lê Anh",
//     createdAt: "2026-03-05",
//     totalPrice: 7800000,
//     status: "approved",
//   },
//   {
//     quotationCode: "BG009",
//     contactName: "Công ty Thành Công",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Nguyễn Hà",
//     createdAt: "2026-03-06",
//     totalPrice: 45000000,
//     status: "rejected",
//   },
//   {
//     quotationCode: "BG010",
//     contactName: "Công ty Đông Á",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     employeeName: "Phạm Hùng",
//     createdAt: "2026-03-07",
//     totalPrice: 12800000,
//     status: "send",
//   },
// ];
// const dataDetail = {
//   id: "BG001",
//   status: "approved",
//   createdAt: "2026-03-01T10:15:00Z",

//   customer: {
//     companyName: "Công ty TNHH ABC",
//     contactName: "Nguyễn Văn B",
//     customerEmail: "nvb@abc.com",
//     contactPhone: "091234567",
//     taxCode: "123456789",
//     customerAddress: "123 đường ABC, Quận 1, TP.HCM",
//   },

//   transportDTO: {
//     origin: "TP. Hồ Chí Minh",
//     destination: "Hà Nội",
//     method: "Đường bộ",
//     createdAt: "2026-03-10",
//   },
//   cargo: {
//     cargoName: "Máy tính",
//     cargoCategory: "hangDeVo",
//     packageCount: 4,
//     grossWeight: 2500,
//     cargoValue: 10000,
//   },
//   items: [
//     {
//       serviceCode: "DV-1",
//       serviceName: "dv1",
//       quantity: 2,
//       unit: "Cont 20'/40'",
//       unitPrice: 15000000,
//       total: 30000000,
//     },
//     {
//       serviceCode: "DV-2",
//       serviceName: "dv2",
//       unit: "Bộ bill",
//       quantity: 2,
//       unitPrice: 2000000,
//       total: 4000000,
//     },
//     {
//       serviceCode: "DV-3",
//       serviceName: "dv3",
//       unit: "Cont 20'/40'",
//       quantity: 5,
//       unitPrice: 500000,
//       total: 2500000,
//     },
//   ],

//   summary: {
//     totalItems: 4,
//     subtotal: 39500000,
//     vatPercent: 10,
//     vatAmount: 3950000,
//     totalAmount: 43450000,
//   },

//   activityLogs: [
//     {
//       action: "Tạo báo giá",
//       user: "Nguyễn Văn A",
//       timestamp: "2026-03-01T10:15:00Z",
//     },
//   ],
// };
export async function getBaoGia(params) {
  try {
    const res = await baoGiaService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: getData,
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
      // data: dataDetail,
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
