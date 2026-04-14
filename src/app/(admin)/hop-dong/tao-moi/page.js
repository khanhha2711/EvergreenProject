import { getBaoGiaChiTiet } from "@/actions/baoGiaAction";
import ContractForm from "@/features/hop-dong/contractForm";

export default async function TaoMoi({ searchParams }) {
  const { baoGiaId = "" } = await searchParams;
  const res = await getBaoGiaChiTiet(baoGiaId);
  const data = res.data;
  return <ContractForm id={baoGiaId} data={data} />;
}
