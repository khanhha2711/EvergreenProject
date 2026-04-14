import { getKhachHang } from "@/actions/khachHangAction";
import KhachHangTable from "./khachHangTable";

export default async function KhachHangTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getKhachHang({
    filter: state,
    search,
  });
  console.log(res.data);

  return <KhachHangTable data={res.data} />;
}
