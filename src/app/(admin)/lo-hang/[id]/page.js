import { getLoHangChiTiet } from "@/actions/loHangActions";
import { Badge } from "@/components/ui/badge";
import ShipmentTabPanel from "@/features/lo-hang/shipmentTabPanel";
import Tab from "@/features/lo-hang/tab";
import { ArrowRight } from "lucide-react";

export default async function LoHang({ params, searchParams }) {
  const { id } = await params;
  const res = await getLoHangChiTiet(id);
  const data = res.data;
  console.log(data);
  return (
    <div className="mb-4">
      <div className="bg-white border-t pt-4 px-6 space-y-4">
        <div className="flex gap-6">
          <h2>Thông tin lô hàng</h2>
          <Badge>Đang vận chuyển</Badge>
        </div>
        <div className="flex gap-20">
          <div className="flex gap-2">
            <p>Người tạo:</p>
            <b>{data?.activity?.user}</b>
          </div>
          <div className="flex items-center gap-2 [&>p]:text-gray-600">
            <p>{data?.origin}</p> <ArrowRight className="icon" />
            <p>{data?.destination}</p>
          </div>
        </div>

        <div>
          <Tab />
        </div>
      </div>
      <div className="mx-12 mt-6">
        <ShipmentTabPanel data={data} searchParams={searchParams} />
      </div>
    </div>
  );
}
