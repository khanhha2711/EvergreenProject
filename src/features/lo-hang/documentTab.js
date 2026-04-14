import { getChungTu } from "@/actions/chungTuAction";
import DocumentView from "./documentView";

const DocumentTab = async ({ id }) => {
  const res = await getChungTu(id);
  const data = res.data;
  return <DocumentView data={data} id={id} />;
};

export default DocumentTab;
