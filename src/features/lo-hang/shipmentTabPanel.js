import CustomTab from "./customTab";
import DocumentTab from "./documentTab";
import OverviewTab from "./overviewTab";
import TransportTab from "./transportTab";

const ShipmentTabPanel = async ({ data, searchParams }) => {
  const { tab = " " } = await searchParams;
  const renderTab = () => {
    switch (tab) {
      case "tong-quan":
        return <OverviewTab data={data} />;

      case "chung-tu":
        return <DocumentTab id={data?.shipmentCode} />;

      case "van-chuyen":
        return <TransportTab id={data?.shipmentCode} />;
      case "hai-quan":
        return <CustomTab id={data?.shipmentCode} />;
      default:
        return <OverviewTab data={data} />;
    }
  };

  return <div>{renderTab()}</div>;
};

export default ShipmentTabPanel;
