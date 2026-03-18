import { MapPin, Phone, Mail } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import PATH from "@/routes/path";

export default function Footer() {
  const footerData = {
    lienKetNhanh: [
      { name: "Trang chủ", href: `${PATH.PUBLIC.HOME}` },
      { name: "Giới thiệu", href: `${PATH.PUBLIC.GIOITHIEU}` },
      { name: "Dịch vụ", href: `${PATH.PUBLIC.DICHVU}` },
      { name: "Liên hệ", href: `${PATH.PUBLIC.LIENHE}` },
    ],
    dichVu: [
      { name: "Khai Báo Hải Quan", href: `${PATH.PUBLIC.DICHVU}` },
      { name: "Khai báo C/O", href: `${PATH.PUBLIC.DICHVU}` },
      { name: "Kiểm Hóa Hàng Hóa", href: `${PATH.PUBLIC.DICHVU}` },
      { name: "Dịch Vụ Vận Chuyển", href: `${PATH.PUBLIC.DICHVU}` },
    ],
    thongTinLienHe: [
      {
        icon: <MapPin className="w-5 h-5 text-primary" />,
        content: "123 Đại Lộ Kinh Doanh, Quận Thương Mại, TP 10001",
      },
      {
        icon: <Phone className="w-5 h-5 text-primary" />,
        content: "+84 (28) 1234-5678",
      },
      {
        icon: <Mail className="w-5 h-5 text-primary" />,
        content: "info@evergreen-logistics.com",
      },
    ],
  };
  return (
    <footer className="w-full max-w-screen-2xl bg-[#0B1221] text-slate-300 mt-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-6">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="bg-white p-1.5 rounded-lg">
                <Image
                  src="/logo.png"
                  alt="Evergreen Logo"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Đối tác tin cậy của bạn trong các giải pháp logistics. Mang đến sự
              xuất sắc vượt biên giới.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6">Liên Kết Nhanh</h4>
            <ul className="space-y-4 text-sm">
              {footerData.lienKetNhanh.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Dịch Vụ</h4>
            <ul className="space-y-4 text-sm">
              {footerData.dichVu.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6">Thông Tin Liên Hệ</h4>
            <ul className="space-y-5 text-sm">
              {footerData.thongTinLienHe.map((item, index) => (
                <li key={index} className="flex gap-3 items-center">
                  <span className="mt-0.5">{item.icon}</span>
                  <span className="text-slate-400">{item.content}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 pt-8 text-center text-xs text-slate-500">
          <p>© 2026 Evergreen Logistics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
