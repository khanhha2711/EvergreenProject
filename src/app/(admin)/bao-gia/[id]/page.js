import { getBaoGiaChiTiet } from "@/actions/baoGiaAction";
import { Card } from "@/components/ui/card";
import { STATEBAOGIA } from "@/constants/bao-gia";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import DichVuTable from "@/features/bao-gia/dichVuTable";
import MoTa from "@/features/bao-gia/moTa";
import { State } from "@/features/bao-gia/state";
import { ChangeMoney } from "@/lib/changeMoney";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await getBaoGiaChiTiet(id);
  const data = res.data;
  return (
    <div className="space-y-4 relative container">
      <div className="space-y-2">
        <h2>Thông tin báo giá</h2>
        <MoTa
          creater={data?.activityLogs[0].user}
          createDate={data?.activityLogs[0].timestamp.split("T")[0]}
          state={
            STATEBAOGIA.find(
              (state) => data.status.toLowerCase() === state.value,
            )?.label || ""
          }
        />
        <div className="absolute top-10 right-20">
          <State
            state={data.status}
            id={data.id}
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
          <h3>Thông tin khách hàng</h3>
          <div className="grid grid-cols-2 space-y-4 ">
            {CUSTOMER_FIELDS.map((field) => {
              return (
                <div key={field.name} className="space-y-1">
                  <p>{field.label || ""}</p>
                  <p>
                    <b>{data.customer[field.name] || ""}</b>
                  </p>
                </div>
              );
            })}
          </div>
        </Card>
        <Card className="px-10 ">
          <h3>Thông tin lô hàng</h3>
          <div className="grid grid-cols-[2fr_1fr] space-y-4">
            {SHIPMENT_FIELDS.map((field) => {
              return (
                <div key={field.name} className="space-y-1">
                  <p>{field.label}</p>
                  <p>
                    <b>{data.transportDTO[field.name]}</b>
                  </p>
                </div>
              );
            })}
            {CARGOFIELDS.map((field) => {
              return (
                <div key={field.name}>
                  <p>{field.label}</p>
                  <div className="text-base">
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
        <Card className="px-10 col-span-full">
          <h3>Bảng chi phí</h3>
          {/* dich vu */}
          <div>
            <DichVuTable data={data.items} isNew={false} />
          </div>
          <div className="flex justify-end pr-10 ">
            <div className="w-fit space-y-1">
              <div className="flex gap-30">
                <p>Tạm tính:</p>
                <div className="font-bold text-sm">
                  <ChangeMoney amount={data.summary.subtotal} />
                </div>
              </div>
              <div className="flex justify-between">
                <p>Thuế VAT(10%):</p>
                <div className="font-bold text-sm">
                  <ChangeMoney amount={data.summary.vatAmount} />
                </div>
              </div>
              <hr />
              <div className="flex justify-between">
                <p className="font-bold">Tổng cộng:</p>
                <div className="text-primary text-sm">
                  <ChangeMoney amount={data.summary.totalAmount} />
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
