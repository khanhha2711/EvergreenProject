import Form from "@/features/public/form";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Building2, Clock, Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";

export default function LienHe() {
  const thongTinLienHe = [
    {
      icon: <MapPin className="text-primary" />,
      tieuDe: "Địa chỉ",
      noiDung: "123 Đại Lộ Kinh Doanh, Quận Thương Mại,TP 10001",
    },
    {
      icon: <Phone className="text-primary" />,
      tieuDe: "Điện thoại",
      noiDung: "+84 (28) 1234-5678",
    },
    {
      icon: <Mail className="text-primary" />,
      tieuDe: "Email",
      noiDung: "info@evergreen-logistics.com",
    },
    {
      icon: <Clock className="text-primary" />,
      tieuDe: "Giờ làm việc",
      noiDung: "Thứ 2 - Thứ 6: 8:00 - 17:00",
    },
  ];
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative w-full h-[30vw]">
        <Image src={"/bannerLH.png"} fill alt="banner" priority />
        <div className="h-full w-full absolute text-center flex flex-col items-center justify-center space-y-2">
          <h1 className="text-4xl capitalize text-primary-foreground">
            Liên hệ
          </h1>
          <h1 className="text-4xl capitalize text-primary">Với chúng tôi</h1>
          <p className="text-xl text-primary-foreground">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn 24/7. Hãy để
            chúng tôi giúp bạn tìm giải pháp logistics phù hợp nhất.
          </p>
        </div>
      </div>
      <div className="text-center flex flex-col items-center space-y-2">
        <Building2
          size={35}
          className="text-primary bg-primary/20 p-2 rounded-sm"
        />
        <h1>Thông tin liên hệ </h1>
        <p>Bạn có thể liên hệ với chúng tôi qua các kênh sau </p>
      </div>
      <div className="flex gap-4 container">
        {thongTinLienHe.map((thongTin, index) => (
          <div key={index} className="flex-1 ">
            <Card className={cn("h-full")}>
              <div className="flex flex-col items-center text-center px-4">
                {thongTin.icon}
                <h3 className="mt-2">{thongTin.tieuDe}</h3>
                <p>{thongTin.noiDung}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      <div className="bg-card w-full flex justify-center border mb-2 pb-4">
        <Form />
      </div>
    </div>
  );
}
