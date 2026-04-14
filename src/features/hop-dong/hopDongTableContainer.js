import { getHopDong } from "@/actions/hopDongAction";
import HopDongTable from "./hopDongTable";

export default async function HopDongTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getHopDong({
    filter: state,
    search,
  });

  return <HopDongTable data={res.data} />;
}
