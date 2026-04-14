import { HopDongService } from "@/service/hopDongService";
export const contractsMock = [
  {
    id: 1,
    contractCode: "HD-2304-001",
    companyName: "KH-0001",
    date: "01/04/2026",
    dateEnd: "01/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 2,
    contractCode: "HD-2304-002",
    companyName: "KH-0002",
    date: "02/04/2026",
    dateEnd: "02/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 3,
    contractCode: "HD-2304-003",
    companyName: "KH-0003",
    date: "03/04/2026",
    dateEnd: "03/04/2027",
    state: "Hết hạn",
  },
  {
    id: 4,
    contractCode: "HD-2304-004",
    companyName: "KH-0004",
    date: "04/04/2026",
    dateEnd: "04/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 5,
    contractCode: "HD-2304-005",
    companyName: "KH-0005",
    date: "05/04/2026",
    dateEnd: "05/04/2027",
    state: "Hết hạn",
  },
  {
    id: 6,
    contractCode: "HD-2304-006",
    companyName: "KH-0006",
    date: "06/04/2026",
    dateEnd: "06/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 7,
    contractCode: "HD-2304-007",
    companyName: "KH-0007",
    date: "07/04/2026",
    dateEnd: "07/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 8,
    contractCode: "HD-2304-008",
    companyName: "KH-0008",
    date: "08/04/2026",
    dateEnd: "08/04/2027",
    state: "Hết hạn",
  },
  {
    id: 9,
    contractCode: "HD-2304-009",
    companyName: "KH-0009",
    date: "09/04/2026",
    dateEnd: "09/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 10,
    contractCode: "HD-2304-010",
    companyName: "KH-0010",
    date: "10/04/2026",
    dateEnd: "10/04/2027",
    state: "Hết hạn",
  },
  {
    id: 11,
    contractCode: "HD-2304-011",
    companyName: "KH-0011",
    date: "11/04/2026",
    dateEnd: "11/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 12,
    contractCode: "HD-2304-012",
    companyName: "KH-0012",
    date: "12/04/2026",
    dateEnd: "12/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 13,
    contractCode: "HD-2304-013",
    companyName: "KH-0013",
    date: "13/04/2026",
    dateEnd: "13/04/2027",
    state: "Hết hạn",
  },
  {
    id: 14,
    contractCode: "HD-2304-014",
    companyName: "KH-0014",
    date: "14/04/2026",
    dateEnd: "14/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 15,
    contractCode: "HD-2304-015",
    companyName: "KH-0015",
    date: "15/04/2026",
    dateEnd: "15/04/2027",
    state: "Hết hạn",
  },
  {
    id: 16,
    contractCode: "HD-2304-016",
    companyName: "KH-0016",
    date: "16/04/2026",
    dateEnd: "16/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 17,
    contractCode: "HD-2304-017",
    companyName: "KH-0017",
    date: "17/04/2026",
    dateEnd: "17/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 18,
    contractCode: "HD-2304-018",
    companyName: "KH-0018",
    date: "18/04/2026",
    dateEnd: "18/04/2027",
    state: "Hết hạn",
  },
  {
    id: 19,
    contractCode: "HD-2304-019",
    companyName: "KH-0019",
    date: "19/04/2026",
    dateEnd: "19/04/2027",
    state: "Còn hiệu lực",
  },
  {
    id: 20,
    contractCode: "HD-2304-020",
    companyName: "KH-0020",
    date: "20/04/2026",
    dateEnd: "20/04/2027",
    state: "Hết hạn",
  },
];
export const contractDetail = {
  id: "HD-2026-001",
  quotationId: "BG-2026-001",
  customer: {
    companyName: "Công ty TNHH ABC",
    contactName: "Nguyễn Văn B",
    customerEmail: "nvb@abc.com",
    contactPhone: "091234567",
    taxCode: "123456789",
    customerAddress: "123 đường ABC, Quận 1, TP.HCM",
  },
  signedDate: "2026-04-10",
  expiredDate: "2026-05-10",

  file: [
    {
      contractCode: "HD-2026-001",
      fileName: "HD-2026-001.pdf",
      fileUrl: "/files/contracts/HD-2026-001.pdf",
      createdAt: "2026-04-10",
    },
  ],

  createdBy: "Nguyễn Văn A",
};
export async function getHopDong(params) {
  try {
    const res = await HopDongService.list(params);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: contractsMock,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function getHopDongChiTiet(id) {
  try {
    const res = await HopDongService.detail(id);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      // data: contractDetail,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}

export async function createHopDong(formData) {
  try {
    const res = await HopDongService.create(formData);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
