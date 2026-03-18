const PATH = {
  LOGIN: "/login",
  PUBLIC: {
    HOME: "/",
    GIOITHIEU: "/gioi-thieu",
    DICHVU: "/dich-vu",
    LIENHE: "/lien-he",
  },
  ADMIN: {
    BAOGIA:{
      DANHSACH:'/bao-gia',
      TAOMOI:'/bao-gia/tao-moi',
      CHITIET: (id) => `/bao-gia/${id}`,
      CHINHSUA:(id) =>`/bao-gia/${id}/chinh-sua`,
    },
    HOPDONG: "/hop-dong",
    LOHANG: "/lo-hang",
    HOADON: "/hoa-don",
    PHIEUTHU: "/phieu-thu",
    VANTAI: "/van-tai",
    KHACHHANG: "/khach-hang",
    NHANVIEN: "/nhan-vien",
    TAIKHOAN: "/tai-khoan",
  },
};
export default PATH;
