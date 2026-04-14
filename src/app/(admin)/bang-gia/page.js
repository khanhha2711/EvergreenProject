import { getDichVu } from "@/actions/dichVuAction";
import DichVuTable from "@/features/bang-gia/dichVuTable";

export default async function BangGia() {
  const res = await getDichVu();
  const data = res.data;
  return <DichVuTable data={data} />;
}
