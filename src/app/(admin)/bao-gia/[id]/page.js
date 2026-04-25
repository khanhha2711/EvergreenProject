import { getBaoGiaChiTiet } from "@/actions/baoGiaAction";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { STATEBAOGIA } from "@/constants/bao-gia";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import CostTable from "@/features/bao-gia/costTable";
import DichVuTable from "@/features/bao-gia/dichVuTable";
import MoTa from "@/features/bao-gia/moTa";
import { State } from "@/features/bao-gia/state";
import { ChangeMoney } from "@/lib/changeMoney";
import { cn } from "@/lib/utils";
import { Box, UserCircle } from "lucide-react";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await getBaoGiaChiTiet(id);
  const data = res.data;
  console.log(data);
  return (
    <div className="space-y-4 relative container">
      <div className="space-y-2">
        <div className="flex gap-6">
          <h2>Thông tin báo giá</h2>
          <Badge
            variant={`${
              STATEBAOGIA.find((s) => s.value === data.status.toLowerCase())
                .variant
            }`}
          >
            {STATEBAOGIA.find(
              (state) => data.status.toLowerCase() === state.value,
            )?.label || ""}
          </Badge>
        </div>
        <MoTa
          creater={data?.activityLogs[0].user}
          createDate={data?.activityLogs[0].timestamp.split("T")[0]}
          id={id}
        />
        <div className="absolute top-10 right-20">
          <State
            state={data.status}
            id={data.quotationCode}
            data={{
              customer: data.customer,
              items: data.items,
              summary: data.summary,
            }}
          />
        </div>
      </div>

      <div className="space-y-2 grid grid-cols-2 gap-6 ">
        <Card className="px-10 ">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <UserCircle className="text-primary" size={15} />
            </div>
            <h3>Thông tin khách hàng</h3>
          </div>
          <div className="space-y-4 ">
            {CUSTOMER_FIELDS.map((field) => {
              return (
                <div
                  key={field.name}
                  className="space-y-2 gap-4 flex items-center"
                >
                  <div>{field.icon}</div>
                  <p className="flex-1 ">{field.label || ""}</p>
                  <p className="flex-2 ">
                    <b>{data.customer[field.name] || ""}</b>
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="px-10 ">
          <div className="flex gap-2 items-center border-b-1 pb-1">
            <div className="w-fit p-2 rounded-full bg-primary/15">
              <Box className="text-primary" size={15} />
            </div>
            <h3>Thông tin lô hàng</h3>
          </div>
          <div className="grid grid-cols-2 gap-y-5 gap-x-4">
            {SHIPMENT_FIELDS.map((field) => {
              return (
                <div
                  key={field.name}
                  className={cn(
                    field.name === "origin"
                      ? "col-span-full"
                      : field.name === "destination" && "col-span-full",
                  )}
                >
                  <div className={cn(`space-y-1 gap-2 flex `)}>
                    <p
                      className={cn(
                        "flex-1",
                        field.name === "origin"
                          ? "flex-1"
                          : field.name === "destination" && "flex-1",
                      )}
                    >
                      {field.label}
                    </p>
                    <p
                      className={cn(
                        "flex-1",
                        field.name === "origin"
                          ? "flex-3"
                          : field.name === "destination" && "flex-3",
                      )}
                    >
                      <b>{data.transportDTO[field.name]}</b>
                    </p>
                  </div>
                </div>
              );
            })}
            {CARGOFIELDS.map((field) => {
              return (
                <div key={field.name} className="flex gap-2">
                  <p className="flex-1">{field.label}</p>
                  <div className="text-base flex-1">
                    <b>
                      {field.name === "cargoCategory" ? (
                        field.options.find(
                          (option) => option.value === data.cargo[field.name],
                        )?.label
                      ) : field.name === "cargoValue" ? (
                        <ChangeMoney
                          amount={data.cargo[field.name]}
                          style="bold"
                        />
                      ) : (
                        data.cargo[field.name]
                      )}
                    </b>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
        <div className="col-span-full">
          <CostTable data={data} status={data.status.toLowerCase()} />
        </div>
      </div>
    </div>
  );
}
