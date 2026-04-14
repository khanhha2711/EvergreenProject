import { baoGiaService } from "@/service/baoGiaService";
import { khachHangService } from "@/service/khachHangService";
import { sendEmailService } from "@/service/sendEmailService";
// const getData = [
//   {
//     customerCode: "KH001",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH002",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH003",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH004",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH005",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH006",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH007",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH008",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH009",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
//   {
//     customerCode: "KH010",
//     companyName: "Công ty TNHH Thương Mại ABC",
//     contactName: "Nguyễn Văn A",
//     contactPhone: "0332158357",
//     customerEmail: "khanhha27112003@gmail.com",
//     customerAddress: "Đà Nẵng",
//   },
// ];
// const detail = {
//   companyName: "Công ty TNHH Thương Mại ABC",
//   contactName: "Nguyễn Văn A",
//   contactPhone: "0332158357",
//   customerEmail: "khanhha27112003@gmail.com",
//   customerAddress: "Đà Nẵng",
//   taxCode: "12345689",
// };
export async function getKhachHang(params) {
  try {
    const res = await khachHangService.list(params);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: getData,
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
      // data: detail,
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
