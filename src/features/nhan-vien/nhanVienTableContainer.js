import { getNhanVien } from "@/actions/nhanVienAction";
import NhanVienTable from "./nhanVienTable";

export default async function NhanVienTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getNhanVien({
    filter: state,
    search,
  });
  console.log(res.data);

  return (
    <div className="space-y-4">
      <div>
        <h1>Danh sách nhân viên</h1>
        <p className="text-muted-foreground">
          Theo dõi và quản lý thông tin nhân viên
        </p>
      </div>
      <NhanVienTable data={res.data} />
    </div>
  );
}
