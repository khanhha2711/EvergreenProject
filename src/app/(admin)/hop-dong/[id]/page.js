import { getHopDongChiTiet } from "@/actions/hopDongAction";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { CONTRACTSTATUS } from "@/constants/hop-dong";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import FileTable from "@/features/hop-dong/fileTable";
import { File } from "lucide-react";

export default async function ChiTiet({ params }) {
  const { id } = await params;
  const res = await getHopDongChiTiet(id);
  const data = res.data;
  console.log(data);
  const status = CONTRACTSTATUS.find(
    (status) => status.value === data?.contractStatus.toLowerCase(),
  );

  return (
    <div className="space-y-2 container ">
      <div className="flex gap-4">
        <h2>Thông tin hợp đồng</h2>
        <Badge variant={status.variant}>{status.label}</Badge>
      </div>
      <div className="my-4 flex gap-10 [&>div]:flex [&>div]:gap-2">
        <div>
          <p>Mã hợp đồng:</p>
          <b>{data?.contractCode}</b>
        </div>
        <div>
          <p>Người tạo:</p>
          <b>{data?.activity.user}</b>
        </div>
        <div>
          <p>Ngày tạo:</p>
          <b>{data?.activity.timestamp}</b>
        </div>
      </div>

      <Card className="grid grid-cols-3 px-12 [&>div]:space-y-1">
        <h3 className="col-span-full">Thông tin tổng quan</h3>
        <div>
          <p>Mã báo giá</p>
          <b>{data?.quotationCode}</b>
        </div>
        <div>
          <p>Tên hợp đồng</p>
          <b>{data?.contractName}</b>
        </div>
        {CUSTOMER_FIELDS.map((field, index) => {
          if (field.name in data?.customer) {
            return (
              <div key={index}>
                <p>{field.label}</p>
                <b>{data?.customer?.[field.name]}</b>
              </div>
            );
          }
        })}
        <div>
          <p className="mb-2">Ngày ký hợp đồng</p>
          <b>{data.signedDate}</b>
        </div>

        <div>
          <p className="mb-2">Ngày hết hạn</p>
          <b>{data.expiredDate}</b>
        </div>
      </Card>
      <Card className="px-12 mt-4">
        <h3 className="font-semibold">File hợp đồng</h3>
        <div className="bg-green-300/20 flex items-center gap-6 p-2 pl-4 rounded-xl">
          <div className="bg-primary/60 p-2 rounded-sm">
            <File className="text-white" size={20} />
          </div>
          <div>
            <FileTable attachment={data.attachment} />
            <p>{data?.activity?.timestamp}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
