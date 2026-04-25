import { getHopDong } from "@/actions/hopDongAction";
import HopDongTable from "./hopDongTable";

export default async function HopDongTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getHopDong({
    filter: state,
    search,
  });

  return (
    <div className="space-y-4">
      <div>
        <h1>Danh sách hợp đồng</h1>
        <p className="text-muted-foreground">
          Quản lý và theo dõi các hợp đồng với khách hàng
        </p>
      </div>
      <HopDongTable data={res.data} />
    </div>
  );
}
