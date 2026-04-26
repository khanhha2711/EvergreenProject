export const CARGOFIELDS = [
  {
    label: "Tên hàng hóa",
    name: "cargoName",
    placeholder: "Nhập tên hàng hóa",
  },
  {
    label: "Loại hàng",
    options: [
      { value: "hangThuong", label: "Hàng thường" },
      { value: "hangNguyHiem", label: "Hàng nguy hiểm" },
      { value: "hangDeVo", label: "Hàng dễ vỡ" },
      { value: "hangLanh", label: "Hàng lạnh" },
      { value: "dienTu", label: "Pin/Điện tử" },
    ],
    name: "cargoCategory",
    placeholder: "Chọn loại hàng",
  },
  {
    label: "Số kiện",
    name: "packageCount",
    placeholder: "Ví dụ: 500",
  },
  {
    label: "Trọng lượng",
    name: "grossWeight",
    placeholder: "Ví dụ: 2500 (kg)",
  },
  {
    label: "Giá trị hàng",
    name: "cargoValue",
    placeholder: "Ví dụ: 1000000",
  },
];
