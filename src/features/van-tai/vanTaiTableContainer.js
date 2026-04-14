import { columnsHangTau, columnsNoiDia } from "./columns";
import VanTaiTable from "./vanTaiTable";
import { getVanTaiHangTau, getVanTaiNoiDia } from "@/actions/vanTaiAction";

export default async function VanTaiTableContainer({ searchParams }) {
  const { state = "", search = "", tab = "" } = await searchParams;
  if (tab === "" || tab === "noi-dia") {
    const res = await getVanTaiNoiDia({ filter: state, search });
    return (
      <VanTaiTable
        dataTable={res.data}
        vanTaiColumns={columnsNoiDia}
        tab={tab}
      />
    );
  } else {
    const res = await getVanTaiHangTau({ filter: state, search });
    return <VanTaiTable dataTable={res.data} vanTaiColumns={columnsHangTau} />;
  }
}
