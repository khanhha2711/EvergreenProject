import { baoGiaService } from "@/service/baoGiaService";
async function getData() {
  return [
    {
      id: "BG001",
      customer: "Công ty ABC",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Nguyễn Hà",
      dateStart: "2026-03-01",
      sum: 15000000,
      state: "draft",
    },
    {
      id: "BG002",
      customer: "Công ty XYZ",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Trần Minh",
      dateStart: "2026-03-03",
      sum: 23000000,
      state: "rejected",
    },
    {
      id: "BG003",
      customer: "Công ty Hoàng Long",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Lê Anh",
      dateStart: "2026-03-05",
      sum: 7800000,
      state: "approved",
    },
    {
      id: "BG004",
      customer: "Công ty Thành Công",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Nguyễn Hà",
      dateStart: "2026-03-06",
      sum: 45000000,
      state: "rejected",
    },
    {
      id: "BG005",
      customer: "Công ty Đông Á",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Phạm Hùng",
      dateStart: "2026-03-07",
      sum: 12800000,
      state: "send",
    },
    {
      id: "BG006",
      customer: "Công ty ABC",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Nguyễn Hà",
      dateStart: "2026-03-01",
      sum: 15000000,
      state: "draft",
    },
    {
      id: "BG007",
      customer: "Công ty XYZ",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Trần Minh",
      dateStart: "2026-03-03",
      sum: 23000000,
      state: "rejected",
    },
    {
      id: "BG008",
      customer: "Công ty Hoàng Long",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Lê Anh",
      dateStart: "2026-03-05",
      sum: 7800000,
      state: "approved",
    },
    {
      id: "BG009",
      customer: "Công ty Thành Công",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Nguyễn Hà",
      dateStart: "2026-03-06",
      sum: 45000000,
      state: "rejected",
    },
    {
      id: "BG010",
      customer: "Công ty Đông Á",
      company: "Công ty TNHH Thương Mại ABC",
      creater: "Phạm Hùng",
      dateStart: "2026-03-07",
      sum: 12800000,
      state: "send",
    },
  ];
}
// export async function getBaoGia(params) {
//   try {
//     const res = await baoGiaService.list(params);
//     return { success: true, data: res.data };
//   } catch (error) {
//     return { success: false, error: "Lỗi hệ thống" };
//   }
// }

export async function getBaoGia({ filter, search }) {
  const data = await getData();

  let result = data;

  if (filter) {
    result = result.filter((item) =>
      item.state.toLowerCase().includes(filter.toLowerCase()),
    );
  }
  if (filter === "All") {
    result = data;
  }

  if (search === "" && filter === "All") {
    result = data;
  }
  if (search) {
    result = result.filter((item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()),
    );
  }

  return {
    success: true,
    data: result,
  };
}

export async function deleteBaoGia(id) {
  try {
    await baoGiaService.delete(id);
    return { success: true };
  } catch (error) {
    return { success: true, error: "Lỗi hệ thống" };
  }
}
