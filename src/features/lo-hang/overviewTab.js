import { Card } from "@/components/ui/card";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { ChangeMoney } from "@/lib/changeMoney";
import {
  Box,
  Building2,
  ClipboardList,
  Dot,
  SquareLibrary,
} from "lucide-react";
import React from "react";

const SHIPMENTFIELDS = [
  { label: "Mã lô hàng", name: "shipmentCode" },
  {
    label: "Mã hợp đồng",
    name: "contractCode",
  },
  { name: "estimatedArrival", label: "Ngày dự kiến" },
  { name: "departureDate", label: "Ngày khởi hành" },
];

const OverviewTab = ({ data }) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-6 w-full justify-between">
        <Card className="grid grid-cols-2 bg-white px-12 flex-1">
          <div className="flex gap-2 items-center col-span-full">
            <SquareLibrary size={20} />
            <h3>Thông tin cơ bản</h3>
          </div>
          {SHIPMENTFIELDS.map((field, index) => (
            <div key={index}>
              <p>{field.label}</p>
              <b>{data?.[field.name]}</b>
            </div>
          ))}
        </Card>
        <Card className="px-12 flex-1">
          <div className="flex gap-2 items-center">
            <ClipboardList size={20} />
            <h3>Danh sách dịch vụ</h3>
          </div>
          <div className="grid grid-cols-2">
            {data?.service.map((service, index) => (
              <ul key={index} className="flex items-center gap-1">
                <Dot className="text-primary" size={30} />
                <li className="text-black">{service}</li>
              </ul>
            ))}
          </div>
        </Card>
      </div>

      <Card className="grid grid-cols-2 bg-white px-12">
        <div className="flex gap-2 items-center col-span-full">
          <Building2 size={20} />
          <h3>Thông tin khách hàng</h3>
        </div>
        {CUSTOMER_FIELDS.map((field, index) => (
          <div key={index}>
            <p>{field.label}</p>
            <b>{data?.customer?.[field.name]}</b>
          </div>
        ))}
      </Card>
      <Card className=" bg-white px-12 flex">
        <div className="flex gap-2 items-center ">
          <Box size={20} />
          <h3>Thông tin hàng hóa</h3>
        </div>
        <div className="flex justify-between">
          {CARGOFIELDS.map((field, index) => (
            <div key={index} className="text-center">
              <p>{field.label}</p>
              <b>
                {field.name === "cargoValue" ? (
                  <ChangeMoney
                    amount={data?.cargo?.[field.name]}
                    style="bold"
                  />
                ) : (
                  data?.cargo?.[field.name]
                )}
              </b>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default OverviewTab;
