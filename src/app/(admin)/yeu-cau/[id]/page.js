import { createBaoGia, detailYeuCau } from "@/actions/yeuCauAction";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CONTAINER } from "@/constants/form";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import MoTa from "@/features/bao-gia/moTa";
import { CreateBaoGiaButton } from "@/features/yeu-cau/createBaoGia";
import PATH from "@/routes/path";
import { Box, List, Truck, User, UserCircle } from "lucide-react";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await detailYeuCau(id);
  const data = res.data;
  console.log("detail", data);

  return (
    <div className="space-y-2 container">
      <div className="flex flex-col justify-between relative space-y-2">
        <div>
          <h2>Thông tin yêu cầu báo giá</h2>
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <p>Mã yêu cầu:</p>
            <p className="text-primary bg-primary/15 px-2 py-1 rounded-xl font-medium">
              {id}
            </p>
          </div>
        </div>
        <div className="absolute right-6 translate-y-1/2">
          <CreateBaoGiaButton requestId={id} />
        </div>
      </div>
      <div className={"space-y-2 grid grid-cols-2 gap-6"}>
        <Card className="px-10">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <User className="text-primary" size={15} />
            </div>
            <h3>Thông tin khách hàng</h3>
          </div>
          <div className=" space-y-4 ">
            {CUSTOMER_FIELDS.map((field) => {
              return (
                <div key={field.name} className="space-y-1 flex">
                  <p className="flex-1 pl-3">{field.label}</p>
                  <p className="text-balance flex-2 font-bold">
                    {data?.customer?.[field.name] || ""}
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="px-10">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <Box className="text-primary" size={15} />
            </div>
            <h3>Thông tin hàng hóa</h3>
          </div>
          <div className="space-y-4 ">
            {CARGOFIELDS.map((field) => {
              return (
                <div key={field.name} className="space-y-1 flex px-3">
                  <p className="flex-1">{field.label}</p>
                  <p className="flex-2">
                    <p className="text-balance font-bold">
                      {field.name === "cargoCategory"
                        ? field.options.find(
                            (option) =>
                              option.value === data?.cargo?.[field.name],
                          )?.label
                        : data?.cargo?.[field.name] || ""}
                    </p>
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="px-10">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <Truck className="text-primary" size={15} />
            </div>
            <h3>Thông tin vận chuyển</h3>
          </div>
          <div className="grid grid-cols-2 space-y-4 ">
            {SHIPMENT_FIELDS.map((field) => {
              return (
                <div key={field.name} className="space-y-1">
                  <p>{field.label}</p>
                  <p>
                    <p className="text-balance font-bold">
                      {field.name === "containerType"
                        ? CONTAINER.find(
                            (container) =>
                              container.value === data?.shipping?.[field.name],
                          )?.label
                        : data?.shipping?.[field.name] || ""}
                    </p>
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="px-10">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <List className="text-primary" size={15} />
            </div>
            <h3>Thông tin dịch vụ </h3>
          </div>
          <div className="grid grid-cols-2 space-y-4 mx-4">
            <ul className="list-disc list-inside">
              {data?.service.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </div>
  );
}
