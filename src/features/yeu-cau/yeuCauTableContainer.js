import YeuCauTable from "./yeuCauTable";
import {  getYeuCau } from "@/actions/yeuCauAction";

export default async function YeuCauTableContainer({ searchParams }) {
  const { state = "", search = "" } = await searchParams;
  const res = await getYeuCau({ filter: state, search });
  console.log(res.data);
  return <YeuCauTable data={res.data} />;
}
