import { getKhachHang } from "@/actions/khachHangAction";
import KhachHangTable from "./khachHangTable";

export default async function KhachHangTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getKhachHang({
    filter: state,
    search,
  });
  console.log(res.data);

  return (
    <div className="space-y-4">
      <div>
        <h1>Danh sách khách hàng</h1>
        <p className="text-muted-foreground">Quản lý thông tin khách hàng </p>
      </div>
      <KhachHangTable data={res.data} />
    </div>
  );
}
