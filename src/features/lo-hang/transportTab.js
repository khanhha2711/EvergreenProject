import { getDatTau, getVanChuyenNoiDia } from "@/actions/vanTaiAction";
import ShipView from "./shipView";
import TruckView from "./truckView";

const TransportTab = async ({ id }) => {
  const [responseNoiDia, responseDatTau] = await Promise.all([
    getVanChuyenNoiDia(id),
    getDatTau(id),
  ]);

  const dataNoiDia = responseNoiDia.data;
  const dataDatTau = responseDatTau.data;
  return (
    <div className="space-y-4">
      <TruckView data={dataNoiDia} id={id} />
      <ShipView id={id} data={dataDatTau} />
    </div>
  );
};

export default TransportTab;
