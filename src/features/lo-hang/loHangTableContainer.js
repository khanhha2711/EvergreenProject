import { getLoHang } from "@/actions/loHangActions";
import LoHangTable from "./loHangTable";

export default async function LoHangTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getLoHang({
    filter: state,
    search,
  });

  return <LoHangTable data={res.data} />;
}
