"use client";
import { DataTable } from "@/components/table/data-table";
import { Card } from "@/components/ui/card";
import { SHIPPINGFIELDS } from "@/constants/lo-hang";
import { truckDetailColumns } from "./truckColumn";
import TransportMap from "@/components/map/transportMap";
import TimeLine from "./timeline";
import { MapPinned, NotepadText, Flag } from "lucide-react";

const STATUS = [
  { title: "Đã xác nhận đặt chỗ", code: "Booking Confirmed" },
  { title: "Chờ lấy hàng", code: "Waiting pickup" },
  { title: "Đang vận chuyển", code: "In transit" },
  { title: "Hoàn thành đơn hàng", code: "Delivered" },
];

export default function TransportDetail({ dataTruck, dataShip, location }) {
  const indexStatus = STATUS.findIndex(
    (item) => item.code === location[0].location,
  );
  let dataStatus = [];

  if (indexStatus !== -1) {
    dataStatus = STATUS.slice(0, indexStatus + 1).map((item) => ({
      status: item.code,
    }));
  }
  return (
    <div className="flex space-x-4 ">
      <div className="flex-3 space-y-4">
        <Card className="px-6 -space-y-2">
          <div className="flex gap-2">
            <NotepadText
              className="text-primary"
              strokeWidth={1.25}
              size={20}
            />
            <h3>Thông tin chung</h3>
          </div>
          <div className="flex gap-10 justify- border p-2 px-4 rounded-sm bg-gray-200/30">
            {SHIPPINGFIELDS.map((field, index) => (
              <div key={index} className="w-fit">
                <p>{field.label}</p>
                <b className="text-balance">{dataShip?.[field.name]}</b>
              </div>
            ))}
          </div>
          <div className="space-y-2">
            <div>
              <p>Tên đơn vị vận tải</p>
              <b>{dataTruck?.companyName}</b>
            </div>
            <div className="flex justify-between">
              <p>Thông tin chuyển xe</p>
            </div>

            <div>
              <DataTable
                data={dataTruck?.trucks}
                columns={truckDetailColumns}
              />
            </div>
          </div>
        </Card>
        <Card className="px-4 -space-y-2">
          <div className="flex gap-2">
            <MapPinned className="text-primary" />
            <h3>Lộ trình</h3>
          </div>
          {!location ? (
            <div>Loading map...</div>
          ) : (
            <TransportMap truck={dataTruck?.trucks} location={location} />
          )}
        </Card>
      </div>
      <div className="flex-1">
        <Card className="h-fit px-3">
          <div className="flex gap-2">
            <h3 className="px-2">Trạng thái vận chuyển</h3>
          </div>
          <TimeLine data={dataStatus} steps={STATUS} />
        </Card>
      </div>
    </div>
  );
}
