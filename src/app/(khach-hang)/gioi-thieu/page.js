import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Eye, Target, BookMarked, CheckCircle, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

export default function GioiThieu() {
  const tamNhinSuMenh = [
    {
      id: "tam-nhin",
      tieuDe: "Tầm Nhìn Của Chúng Tôi",
      moTa: "Trở thành đối tác logistics hàng đầu trong khu vực, được công nhận vì sự đổi mới, độ tin cậy và sự xuất sắc trong việc tạo điều kiện thương mại toàn cầu. Chúng tôi hình dung một thế giới nơi thương mại quốc tế diễn ra liền mạch, được thúc đẩy bởi cam kết của chúng tôi về dịch vụ chất lượng và cải tiến liên tục.",
      icon: <Eye className="text-primary" />,
    },
    {
      id: "su-menh",
      tieuDe: "Sứ Mệnh Của Chúng Tôi",
      moTa: "Cung cấp các giải pháp logistics toàn diện, hiệu quả và tuân thủ để trao quyền cho các doanh nghiệp thành công trên thị trường toàn cầu. Chúng tôi cam kết cung cấp dịch vụ cá nhân hóa, hướng dẫn chuyên môn và các giải pháp đổi mới vượt quá mong đợi của khách hàng.",
      icon: <Target className="text-primary" />,
    },
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
  const danhSachLogo = [
    "/logo/BBF.png",
    "/logo/chanhThu.png",
    "/logo/dingo.png",
    "/logo/nafoods.png",
    "/logo/SOVI.png",
    "/logo/vinhHoan.png",
  ];
  return (
    <div className="space-y-6 flex flex-col items-center">
      <div className="relative w-full h-[50vh] overflow-hidden">
        <Image
          src={"/bannerGT.png"}
          alt="banner"
          fill
          objectFit="cover"
          priority
        />
        <div className="bg-black/70 absolute w-full h-full flex flex-col justify-center pl-20">
          <h1 className="text-white text-4xl w-[30vw] ">
            Xây Dựng Nền Tảng{" "}
            <span className="text-4xl font-bold text-primary">
              {" "}
              Thương Mại Toàn Cầu
            </span>
          </h1>
          <p className="w-[30vw] text-primary-foreground mt-4">
            Với hơn 5 năm kinh nghiệm, chúng tôi kết nối doanh nghiệp với thế
            giới thông qua các giải pháp logistics đáng tin cậy, chuyên nghiệp
            và hiệu quả.
          </p>
        </div>
      </div>
      {/*  */}
      <div className="container flex gap-30 px-12">
        <div className="flex-2 space-y-4 ">
          <h1>Câu Chuyện Của Chúng Tôi</h1>
          <div className="space-y-2">
            <p>
              Evergreen Logistics được thành lập vào năm 2021 với một sứ mệnh rõ
              ràng: làm cho thương mại quốc tế trở nên dễ tiếp cận và không rắc
              rối cho các doanh nghiệp thuộc mọi quy mô. Điều bắt đầu như một
              dịch vụ thông quan hải quan nhỏ đã phát triển thành một nhà cung
              cấp giải pháp logistics toàn diện.
            </p>
            <p>
              Qua nhiều năm, chúng tôi đã xây dựng danh tiếng dựa trên độ tin
              cậy, chuyên môn và dịch vụ cá nhân hóa. Đội ngũ chuyên gia dày dạn
              kinh nghiệm của chúng tôi mang đến hàng thập kỷ kinh nghiệm kết
              hợp trong quy định hải quan, vận chuyển hàng hóa và tuân thủ
              thương mại quốc tế.
            </p>
            <p>
              Ngày nay, chúng tôi tự hào phục vụ hơn 500 khách hàng trong các
              ngành khác nhau, giúp họ điều hướng sự phức tạp của thương mại
              toàn cầu với sự tự tin và dễ dàng.
            </p>
          </div>
        </div>
        <div className="flex-1 h-[50vh] relative ">
          <Image
            src={"/team.png"}
            fill
            priority
            alt="team"
            className="rounded-2xl"
          />
        </div>
      </div>
      {/*  */}
      <div className="flex justify-around bg-card py-12 px-12">
        {tamNhinSuMenh.map((tamNhin, index) => (
          <div className="mx-12" key={index}>
            <Card>
              <div className="flex flex-col items-start px-12 py-6 space-y-2">
                <div>{tamNhin.icon}</div>
                <h2>{tamNhin.tieuDe}</h2>
                <p>{tamNhin.moTa}</p>
              </div>
            </Card>
          </div>
        ))}
      </div>
      {/*  */}
      <div className="container space-y-6">
        <div className="text-center">
          <h2>Vì Sao Chọn Chúng Tôi ?</h2>
          <p>Tại sao chọn Evergreen Logistics cho nhu cầu logistics của bạn</p>
        </div>
        <div className="flex gap-6">
          {danhSachGiaTri.map((giaTri, index) => (
            <div className="flex-1" key={index}>
              <Card className={cn("h-full")}>
                <div className="flex flex-col items-center px-4 text-center space-y-2">
                  <div>{giaTri.icon}</div>
                  <h3>{giaTri.tieuDe}</h3>
                  <p>{giaTri.moTa}</p>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
      {/*  */}
      {/*  */}
      <div className="border-y-1 bg-card w-full py-6 ">
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
