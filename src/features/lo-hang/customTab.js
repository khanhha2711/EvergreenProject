import { detailHaiQuan } from "@/actions/haiQuanAction";
import CustomView from "./customView";

const DocumentTab = async ({ id }) => {
  const res = await detailHaiQuan(id);
  const data = res.data;
  return <CustomView data={data} id={id} />;
};

export default DocumentTab;
