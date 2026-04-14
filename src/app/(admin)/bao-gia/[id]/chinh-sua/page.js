import { getBaoGiaChiTiet } from "@/actions/baoGiaAction";
import { STATEBAOGIA } from "@/constants/bao-gia";
import Form from "@/features/bao-gia/form";
import MoTa from "@/features/bao-gia/moTa";

export default async function Page({ params }) {
  const { id } = await params;
  const res = await getBaoGiaChiTiet(id);
  const data = res.data;
  console.log(data);
  return (
    <div className="space-y-4 px-6 py-4 relative">
      <h3>Báo giá {id}</h3>
      <MoTa
        creater={data.activityLogs[0].user}
        createDate={data.activityLogs[0].timestamp.split("T")[0]}
        state={
          STATEBAOGIA.find(
            (status) => data.status.toLowerCase() === status.value,
          )?.label || ""
        }
      />
      <Form form={data} isEdit={true} />
    </div>
  );
}
