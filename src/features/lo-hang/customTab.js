import { getHaiQuan } from "@/actions/haiQuanAction";
import CustomView from "./customView";

const DocumentTab = async ({ id }) => {
  const res = await getHaiQuan(id);
  const data = [];
  return <CustomView data={data} id={id} />;
};

export default DocumentTab;
