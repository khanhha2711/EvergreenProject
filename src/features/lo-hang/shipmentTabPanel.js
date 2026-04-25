import CustomTab from "./customTab";
import DocumentTab from "./documentTab";
import OverViewTab from "./overViewTab";
import TransportTab from "./transportTab";

const ShipmentTabPanel = async ({ data, searchParams }) => {
  const { tab = " " } = await searchParams;
  const renderTab = () => {
    switch (tab) {
      case "tong-quan":
        return <OverViewTab id={data?.shipmentCode} data={data} />;

      case "chung-tu":
        return <DocumentTab id={data?.shipmentCode} />;

      case "van-chuyen":
        return <TransportTab id={data?.shipmentCode} />;
      case "hai-quan":
        return <CustomTab id={data?.shipmentCode} />;
      default:
        return <OverViewTab id={data?.shipmentCode} data={data} />;
    }
  };

  return <div>{renderTab()}</div>;
};

export default ShipmentTabPanel;
