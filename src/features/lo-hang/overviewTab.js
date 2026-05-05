import { Card } from "@/components/ui/card";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { ChangeMoney } from "@/lib/changeMoney";
import {
  Box,
  Building2,
  ClipboardList,
  Dot,
  Route,
  SquareLibrary,
} from "lucide-react";
import React from "react";
import TimeLine from "./timeline";
import { SHIPMENT_STEPS } from "@/constants/lo-hang";
import { getLoHangDashboard } from "@/actions/loHangActions";

const SHIPMENTFIELDS = [
  { label: "Mã lô hàng", name: "shipmentCode" },
  {
    label: "Mã hợp đồng",
    name: "contractCode",
  },
  { name: "departureDate", label: "Ngày khởi hành" },
  { name: "estimatedArrival", label: "Ngày dự kiến" },
];

const OverViewTab = async ({ id, data }) => {
  const res = await getLoHangDashboard(id);
  const history = res.data;
  console.log(history);
  return (
    <div className="grid grid-cols-[2fr,2fr,1fr] gap-4 ">
      <Card className="flex bg-white px-8 ">
        <div className="flex gap-2 items-center ">
          <SquareLibrary size={15} />
          <b className="text-base">Thông tin cơ bản</b>
        </div>
        <div className="grid grid-cols-2 gap-y-4">
          {SHIPMENTFIELDS.map((field, index) => (
            <div key={index}>
              <p>{field.label}</p>
              <b>{data?.[field.name]}</b>
            </div>
          ))}
        </div>

        <div className="">
          <div className="flex gap-2 items-center">
            <ClipboardList size={15} />
            <b className="text-base ">Danh sách dịch vụ</b>
          </div>
          <div className="flex flex-wrap gap-x-12 gap-y-4 mt-2">
            {data?.service.map((service, index) => (
              <ul key={index} className="flex items-center gap-1">
                <Dot className="text-primary" size={30} />
                <li className="text-black text-sm">{service}</li>
              </ul>
            ))}
          </div>
        </div>
      </Card>
      <Card className=" bg-white px-8 flex">
        <div className="flex gap-2 items-center ">
          <Box size={18} />
          <b className="text-base">Thông tin hàng hóa</b>
        </div>
        <div className="space-y-4">
          {CARGOFIELDS.map((field, index) => (
            <div key={index} className="grid grid-cols-2 gap-15">
              <p>{field.label}</p>
              <b>
                {field.name === "cargoValue" ? (
                  <ChangeMoney
                    amount={data?.cargo?.[field.name]}
                    style="bold"
                  />
                ) : field.name === "cargoCategory" ? (
                  field.options.find(
                    (item) => item.value === data?.cargo?.[field.name],
                  ).label
                ) : (
                  data?.cargo?.[field.name]
                )}
              </b>
            </div>
          ))}
        </div>
      </Card>
      <Card className="grid grid-cols-2 bg-white px-8 col-start-1 col-span-2 ">
        <div className="flex gap-2 items-center col-span-full">
          <Building2 size={18} />
          <b className="text-base">Thông tin khách hàng</b>
        </div>
        {CUSTOMER_FIELDS.map((field, index) => (
          <div key={index}>
            <p>{field.label}</p>
            <b>{data?.customer?.[field.name]}</b>
          </div>
        ))}
      </Card>
      <div className="col-start-3 row-start-1 row-span-2">
        <Card className="px-4">
          <div className="flex gap-4 items-center">
            <div className=" rotate-90 ">
              <Route className="text-primary" size={20} />
            </div>
            <b className="text-base">Quy trình xử lý lô hàng</b>
          </div>
          <div>
            <TimeLine data={history} steps={SHIPMENT_STEPS} />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default OverViewTab;
