import { getDichVu } from "@/actions/dichVuAction";
import DichVuTable from "@/features/bang-gia/dichVuTable";

export default async function BangGia({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getDichVu({ filter: state, search });
  const data = res.data;
  console.log(data);
  return <DichVuTable data={data} />;
}
