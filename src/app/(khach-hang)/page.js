import { Card } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  ArrowRight,
  BookMarked,
  CheckCircle,
  Target,
  Truck,
  FileText,
  Search,
  ClipboardCheck,
  Ship,
} from "lucide-react";
import PATH from "@/routes/path";

export default function TrangChu() {
  const tongHop = [
    { so: "5+", noiDung: "Năm kinh nghiệm" },
    { so: "500+", noiDung: "Khách hàng" },
    { so: "5000+", noiDung: "Lô hàng đã xử lý" },
    { so: "98%", noiDung: "Tỉ lệ thành công" },
  ];
  const danhSachGiaTri = [
    {
      tieuDe: "Đội Ngũ Chuyên Gia",
      moTa: "Các chuyên gia logistics chuyên nghiệp và giàu kinh nghiệm",
      icon: <CheckCircle className="text-primary" />,
    },
    {
      tieuDe: "Được Cấp Phép & Chứng Nhận",
      moTa: "Tuân thủ đầy đủ các quy định thương mại quốc tế",
      icon: <BookMarked className="text-primary" />,
    },
    {
      tieuDe: "Khách Hàng Là Trên Hết",
      moTa: "Cam kết cung cấp dịch vụ xuất sắc",
      icon: <Target className="text-primary" />,
    },
    {
      tieuDe: "Nhanh Chóng & Đáng Tin Cậy",
      moTa: "Xử lý hiệu quả và giao hàng đúng hạn",
      icon: <Truck className="text-primary " />,
    },
  ];
  const danhSachDichVu = [
    {
      id: 1,
      tieuDe: "Khai Báo Hải Quan",
      moTa: "Dịch vụ thông quan hải quan đầy đủ với xử lý tài liệu chuyên nghiệp cho quy trình xuất/nhập khẩu suôn sẻ.",
      icon: <FileText className=" text-[#00b34d]" />,
    },
    {
      id: 2,
      tieuDe: "Khai báo C/O",
      moTa: "Dịch vụ thông quan hải quan đầy đủ với xử lý tài liệu chuyên nghiệp cho quy trình xuất/nhập khẩu suôn sẻ.",
      icon: <Search className=" text-[#00b34d]" />,
    },
    {
      id: 3,
      tieuDe: "Kiểm Hóa Hàng Hóa",
      moTa: "Dịch vụ kiểm tra toàn diện đảm bảo tuân thủ các tiêu chuẩn chất lượng và an toàn.",
      icon: <ClipboardCheck className=" text-[#00b34d]" />,
    },
    {
      id: 4,
      tieuDe: "Dịch Vụ Vận Chuyển",
      moTa: "Giải pháp vận tải đáng tin cậy bao gồm vận chuyển đường biển, hàng không và đường bộ toàn cầu.",
      icon: <Ship className=" text-[#00b34d]" />,
    },
  ];
  const danhSachLogo = [
    "/logo/BBF.png",
    "/logo/chanhThu.png",
    "/logo/dingo.png",
    "/logo/nafoods.png",
    "/logo/SOVI.png",
    "/logo/vinhHoan.png",
  ];
  return (
    <div className="space-y-10 flex flex-col items-center ">
      {/* banner */}
      <div className="relative w-full h-[30vw] overflow-hidden">
        <Image
          src="/home.png"
          alt="Evergreen Logistics Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute text-white left-20 h-full flex flex-col justify-center">
          <h1 className="w-full xl:w-[24vw] leading-10 text-xl sm:text-4xl ">
            EVERGREEN TRADING SERVICE
          </h1>
          <p className="lg:w-[80vw] sm:w-[30vw] mt-2 text-sm">
            Dịch vụ thông quan hải quan, kiểm hóa hàng hóa và vận chuyển chuyên
            nghiệp cho thương mại quốc tế liền mạch.
          </p>
        </div>
      </div>
      {/* dashboard */}
      <div className="container py-0 flex w-full justify-between gap-10 inset-in">
        {tongHop.map((the, index) => (
          <Card key={index} className={cn("flex-1 border ")}>
            <div className="flex flex-col items-center">
              <h1 className="text-2xl sm:text-5xl text-primary ">{the.so}</h1>
              <p className="text-sm sm:text-lg pt-2 text-center">
                {the.noiDung}
              </p>
            </div>
          </Card>
        ))}
      </div>
      {/* Gioi thieu */}
      <div className="sm:flex w-full px-12 h-[50vh] gap-30 bg-card py-12 border-y-1">
        <div className="flex-1 relative ">
          <Image
            src="/about.png"
            alt="Giới thiệu"
            fill
            className="object-fill"
            priority
          />
        </div>
        <div className="flex-1 flex flex-col justify-center gap-4 ">
          <div className="space-y-4 ">
            <h2>Evergreen Logistics</h2>
            <p>
              Evergreen Logistics là đối tác tin cậy của bạn trong việc điều
              hướng các phức tạp của thương mại quốc tế. Với hơn 10 năm kinh
              nghiệm trong ngành, chúng tôi chuyên cung cấp các giải pháp
              logistics toàn diện phù hợp với nhu cầu kinh doanh độc đáo của
              bạn.
            </p>
            <p>
              Đội ngũ chuyên gia dày dạn kinh nghiệm của chúng tôi cam kết đảm
              bảo hàng hóa của bạn di chuyển qua biên giới một cách trơn tru và
              hiệu quả, trong khi tuân thủ tất cả các yêu cầu pháp lý.
            </p>
          </div>
          <Button className="w-fit">
            <Link
              href={PATH.PUBLIC.GIOITHIEU}
              className="flex items-center gap-2"
            >
              Khám phá thêm <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
      {/* Dich vu */}
      <div className="container  ">
        <div className="text-center mb-6">
          <h2 className="capitalize font-bold">Dịch vụ </h2>
          <p>Giải pháp logistics toàn diện cho doanh nghiệp của bạn</p>
        </div>
        <div className="sm:flex gap-10 ">
          {danhSachDichVu.map((dichVu, index) => (
            <Card key={index} className={cn("flex-1 px-8 py-7")}>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-fit">{dichVu.icon}</div>
                </div>

                <h3 className="capitalize">{dichVu.tieuDe}</h3>
                <p>{dichVu.moTa}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/* gia tri */}
      <div className="p-4 pt-6 bg-card  border-y-1">
        <div className="text-center mb-6">
          <h2 className="capitalize font-bold">Vì sao chọn chúng tôi?</h2>
          <p>Tại sao chọn Evergreen Logistics cho nhu cầu logistics của bạn</p>
        </div>
        <div className="flex gap-10 ">
          {danhSachGiaTri.map((giaTri, index) => (
            <Card
              key={index}
              className={cn("flex-1 px-8 border-none shadow-none")}
            >
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <div className="w-fit p-2 rounded-sm bg-primary/15 ">
                    {giaTri.icon}
                  </div>
                </div>

                <h3 className="capitalize">{giaTri.tieuDe}</h3>
                <p>{giaTri.moTa}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
      {/*  */}
      <div className="border-y-1 bg-card w-full px-4 py-6 ">
        <div className="text-center">
          <h2 className="capitalize font-bold">Khách Hàng Tiêu Biểu</h2>
          <p>Được tin tưởng bởi các công ty hàng đầu trên toàn thế giới</p>
        </div>
        <div className="flex justify-center gap-15 pt-4 w-full h-30">
          {danhSachLogo.map((logo, index) => (
            <div key={index} className="relative w-30 ">
              <Image src={logo} alt={logo} fill />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
