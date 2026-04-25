import {
  getDatTau,
  getLocationTransport,
  getVanChuyenNoiDia,
} from "@/actions/vanTaiAction";
import ShipView from "./shipView";
import TruckView from "./truckView";
import TransportDetail from "./truckDetail";
import ConfirmTransport from "./confirmTransport";

const TransportTab = async ({ id }) => {
  const [responseNoiDia, responseDatTau] = await Promise.all([
    getVanChuyenNoiDia(id),
    getDatTau(id),
  ]);
  const dataNoiDia = responseNoiDia.data;
  const dataDatTau = responseDatTau.data;
  const res = await getLocationTransport(id);
  const location = res.data;
  console.log(location);
  return (
    <div className="space-y-4">
      {dataDatTau?.status === "DONE" ? (
        <TransportDetail
          dataTruck={dataNoiDia}
          dataShip={dataDatTau}
          location={location}
        />
      ) : (
        <>
          <TruckView data={dataNoiDia} id={id} />
          <ShipView id={id} data={dataDatTau} />
          {dataNoiDia && dataDatTau && <ConfirmTransport id={id} />}
        </>
      )}
    </div>
  );
};

export default TransportTab;
