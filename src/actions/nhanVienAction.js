import { nhanVienService } from "@/service/nhanVienService";

// export const employeeData = [
//   {
//     employeeCode: "EMP-LOG-001",
//     employeeName: "Nguyễn Văn Hải",
//     employeePhone: "0901234567",
//     employeeEmail: "hai.nguyen@logistics.com",
//     employeePosition: "Nhân viên điều phối vận tải",
//     employeeDepartment: "Vận hành",
//   },
//   {
//     employeeCode: "EMP-LOG-002",
//     employeeName: "Trần Thị Lan",
//     employeePhone: "0912345678",
//     employeeEmail: "lan.tran@logistics.com",
//     employeePosition: "Nhân viên chứng từ",
//     employeeDepartment: "Chứng từ",
//   },
//   {
//     employeeCode: "EMP-LOG-003",
//     employeeName: "Lê Minh Tuấn",
//     employeePhone: "0923456789",
//     employeeEmail: "tuan.le@logistics.com",
//     employeePosition: "Nhân viên khai báo hải quan",
//     employeeDepartment: "Hải quan",
//   },
//   {
//     employeeCode: "EMP-LOG-004",
//     employeeName: "Phạm Thị Hương",
//     employeePhone: "0934567890",
//     employeeEmail: "huong.pham@logistics.com",
//     employeePosition: "Nhân viên kinh doanh",
//     employeeDepartment: "Kinh doanh",
//   },
//   {
//     employeeCode: "EMP-LOG-005",
//     employeeName: "Hoàng Anh Đức",
//     employeePhone: "0945678901",
//     employeeEmail: "duc.hoang@logistics.com",
//     employeePosition: "Trưởng phòng vận hành",
//     employeeDepartment: "Vận hành",
//   },
//   {
//     employeeCode: "EMP-LOG-006",
//     employeeName: "Đỗ Quang Huy",
//     employeePhone: "0956789012",
//     employeeEmail: "huy.do@logistics.com",
//     employeePosition: "Nhân viên kho",
//     employeeDepartment: "Kho bãi",
//   },
//   {
//     employeeCode: "EMP-LOG-007",
//     employeeName: "Vũ Thị Mai",
//     employeePhone: "0967890123",
//     employeeEmail: "mai.vu@logistics.com",
//     employeePosition: "Kế toán logistics",
//     employeeDepartment: "Kế toán",
//   },
//   {
//     employeeCode: "EMP-LOG-008",
//     employeeName: "Nguyễn Quốc Bảo",
//     employeePhone: "0978901234",
//     employeeEmail: "bao.nguyen@logistics.com",
//     employeePosition: "Nhân viên theo dõi đơn hàng",
//     employeeDepartment: "CSKH",
//   },
// ];

export async function getNhanVien(params) {
  try {
    const res = await nhanVienService.list(params);
    console.log(res.data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: employeeData,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getNhanVienChiTiet(id) {
  try {
    const res = await nhanVienService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: employeeData[0],
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createNhanVien(data) {
  try {
    const res = await nhanVienService.create(data);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function updateNhanVien({ id, data }) {
  try {
    const res = await nhanVienService.update({ id, data });
    console.log(res);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
