import { CheckCircle } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
export default function DichVu() {
  const danhSachDichVu = [
    {
      tieuDe: "Khai báo hải quan",
      moTa: "Dịch vụ thông quan hải quan đầy đủ với xử lý tài liệu chuyên nghiệp cho quy trình xuất/nhập khẩu suôn sẻ.",
      chiTiet: [
        "Khai báo xuất nhập khẩu",
        "Phân loại mã HS",
        "Tính toán thuế quan",
        "Tư vấn tuân thủ hải quan",
        "Thông quan nhanh",
      ],
      image: "/haiQuan.png",
    },
    {
      tieuDe: "Khai báo C/O",
      moTa: "Xử lý C/O nhanh chóng và chính xác để hỗ trợ yêu cầu thương mại quốc tế và lợi ích thuế quan ưu đãi.",
      chiTiet: [
        "Xử lý Form E, Form D",
        "C/O thông thường",
        "GSP Form A",
        "C/O ưu đãi",
        "Dịch vụ trong ngày",
      ],
      image: "/khaiBao.png",
    },
    {
      tieuDe: "Kiểm hóa hàng ",
      moTa: "Dịch vụ kiểm tra toàn diện đảm bảo tuân thủ các tiêu chuẩn chất lượng và an toàn cho các loại hàng hóa khác nhau.",
      chiTiet: [
        "Kiểm tra trước khi xuất hàng",
        "Xác minh chất lượng",
        "Xác nhận số lượng",
        "Kiểm tra bao bì",
        "Hỗ trợ tài liệu",
      ],
      image: "/kiemHoa.png",
    },
    {
      tieuDe: "Dịch vụ vận chuyển ",
      moTa: "Giải pháp vận tải đáng tin cậy bao gồm vận chuyển đường biển, hàng không và đường bộ với theo dõi và hỗ trợ toàn diện.",
      chiTiet: [
        "Vận tải biển (RCL/LCL)",
        "Vận tải hàng không",
        "Vận tải đường bộ",
        "Theo dõi hàng thời gian thực",
        "Bảo hiểm hàng hóa",
      ],
      image: "/vanChuyen.png",
    },
  ];
  return (
    <div className="space-y-6">
      {/*  */}
      <div className="relative w-full h-[50vh]">
        <Image src={"/bannerDV.png"} alt="banner" priority fill />
        <div className="absolute flex flex-col justify-center h-full pl-30 space-y-2">
          <h1>Dịch Vụ Logistics</h1>
          <h1 className="text-primary">Toàn Diện & Đáng Tin Cậy</h1>
          <p className="w-[40vw]">
            Từ thông quan hải quan đến vận chuyển quốc tế, chúng tôi cung cấp
            giải pháp logistics trọn gói giúp doanh nghiệp của bạn vận hành trơn
            tru và hiệu quả.
          </p>
        </div>
        <div className="relative w-2xl h-full left-2/4">
          <Image src={"/imageDV.png"} alt="image" priority fill />
        </div>
      </div>
      {/*  */}
      <div className="px-20 space-y-20 ">
        {danhSachDichVu.map((dichVu, index) => (
          <div
            key={index}
            className={cn(
              "flex gap-40 ",
              index % 2 !== 0 && "flex-row-reverse",
            )}
          >
            <div className="flex-1 space-y-2">
              <div className="bg-primary/20 text-primary w-fit px-2 rounded-2xl py-1">
                Dịch vụ 0{index + 1}
              </div>
              <h1>{dichVu.tieuDe}</h1>
              <p>{dichVu.moTa}</p>
              {dichVu.chiTiet.map((noiDung, index) => (
                <p className="flex gap-2 items-center" key={index}>
                  <CheckCircle size={16} className="text-primary" /> {noiDung}
                </p>
              ))}
            </div>
            <div className="relative h-[40vh] w-[40%]">
              <Image
                src={dichVu.image}
                priority
                fill
                alt="mo ta"
                objectFit="cover"
                className="rounded-4xl"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
