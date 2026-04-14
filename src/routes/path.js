const PATH = {
  LOGIN: "/login",
  PUBLIC: {
    HOME: "/",
    GIOITHIEU: "/gioi-thieu",
    DICHVU: "/dich-vu",
    LIENHE: "/lien-he",
  },
  ADMIN: {
    YEUCAU: {
      DANHSACH: "/yeu-cau",
      CHITIET: (id) => `/yeu-cau/${id}`,
      TAOMOI: "/yeu-cau/tao-moi",
    },
    BAOGIA: {
      DANHSACH: "/bao-gia",
      TAOMOI: "/bao-gia/tao-moi",
      CHITIET: (id) => `/bao-gia/${id}`,
      CHINHSUA: (id) => `/bao-gia/${id}/chinh-sua`,
    },
    HOPDONG: {
      DANHSACH: "/hop-dong",
      TAOMOI: "/hop-dong/tao-moi",
      CHITIET: (id) => `/hop-dong/${id}`,
    },
    LOHANG: {
      DANHSACH: "/lo-hang",
      CHITIET: (id) => `/lo-hang/${id}`,
    },
    VANTAI: {
      DANHSACH: "/van-tai",
    },
    DICHVU: "/bang-gia",
    KHACHHANG: { DANHSACH: "/khach-hang" },
    NHANVIEN: "/nhan-vien",
  },
};
export default PATH;
