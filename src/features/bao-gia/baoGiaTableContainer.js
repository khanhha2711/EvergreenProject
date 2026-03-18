import { getBaoGia } from "@/actions/baoGiaAction";
import BaoGiaTable from "./baoGiaTable";

export default async function BaoGiaTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;

  const res = await getBaoGia({
    filter: state,
    search,
  });

  return <BaoGiaTable data={res.data} />;
}
