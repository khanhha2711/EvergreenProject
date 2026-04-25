import { getLoHang } from "@/actions/loHangActions";
import LoHangTable from "./loHangTable";

export default async function LoHangTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getLoHang({
    filter: state,
    search,
  });

  return (
    <div className="space-y-4">
      <div>
        <h1>Danh sách lô hàng</h1>
        <p className="text-muted-foreground">
          Theo dõi và quản lý các lô hàng trong hệ thống
        </p>
      </div>
      <LoHangTable data={res.data} />
    </div>
  );
}
