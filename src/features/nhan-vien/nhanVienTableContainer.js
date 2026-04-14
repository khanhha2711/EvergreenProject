import { getNhanVien } from "@/actions/nhanVienAction";
import NhanVienTable from "./nhanVienTable";

export default async function NhanVienTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getNhanVien({
    filter: state,
    search,
  });
  console.log(res.data);

  return <NhanVienTable data={res.data} />;
}
