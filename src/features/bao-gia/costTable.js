"use client";
import { Button } from "@/components/ui/button";
import { ChangeMoney } from "@/lib/changeMoney";
import DichVuTable from "./dichVuTable";
import { FileSpreadsheet, List, PenSquareIcon, PlusCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getDichVu } from "@/actions/dichVuAction";
import { useRouter } from "next/navigation";
import { updateBaoGia } from "@/actions/baoGiaAction";
import PATH from "@/routes/path";
import ConfirmModal from "@/components/modal/comfirmModal";

export default function CostTable({ data, status }) {
  const [isEdit, setIsEdit] = useState(false);
  const [isNew, setIsNew] = useState(false);
  const [items, setItems] = useState(data.items);
  const [serviceFields, setServiceFields] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getDichVu();
      const data = res.data;
      if (res.success) {
        setServices(data);
        setServiceFields(
          res.data.map((s) => ({
            value: s.serviceCode,
            label: s.serviceName,
          })),
        );
      }
    };

    fetchServices();
  }, []);

  const handleNext = async (e) => {
    setLoading(true);
    e.preventDefault();
    const res = await updateBaoGia({ id: data.id, data: items });
    if (res.success) {
      toast.success("Cập nhật thành công");
      router.refresh();
    } else {
      setLoading(false);
      toast.error("Cập nhật không thành công hãy thực hiện lại");
    }
  };

  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        id: "",
        name: "",
        quantity: 0,
        unit: 0,
        unitPrice: 0,
        total: 0,
      },
    ]);
    setIsNew(true);
  };
  const subtotal = items?.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * 0.1;
  const totalAmount = subtotal + vatAmount;
  return (
    <div>
      {isOpen && (
        <ConfirmModal
          title="Xác nhận hủy"
          content="Bạn có chắc chắn muốn hủy yêu cầu này?"
          onConfirm={() => {
            setIsOpen(false);
            setIsEdit(false);
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}

      {!isEdit ? (
        <Card className="px-10 ">
          <div className="flex justify-between items-center">
            <div className="flex gap-2 items-center border-b-1 pb-1">
              <div className="w-fit p-2 rounded-full bg-primary/15">
                <FileSpreadsheet className="text-primary" size={15} />
              </div>
              <h3>Bảng chi phí</h3>
            </div>
            {(status !== "done" || status !== "send") && (
              <Button
                onClick={() => setIsEdit(true)}
                className="flex items-center"
              >
                <PenSquareIcon size={10} />
                Chỉnh sửa
              </Button>
            )}
          </div>

          <div>
            <DichVuTable data={data.items} isNew={false} />
          </div>
          <div className="flex justify-end pr-10 ">
            <div className="w-fit space-y-1">
              <div className="flex gap-30">
                <p>Tạm tính:</p>
                <div className="font-bold text-base">
                  <ChangeMoney amount={data.summary.subtotal} />
                </div>
              </div>
              <div className="flex justify-between">
                <p>Thuế VAT(10%):</p>
                <div className="font-bold text-base">
                  <ChangeMoney amount={data.summary.vatAmount} />
                </div>
              </div>
              <hr />
              <div className="flex justify-between">
                <p className="font-bold text-base">Tổng cộng:</p>
                <div className="text-primary">
                  <ChangeMoney
                    amount={data.summary.totalAmount}
                    style="bold"
                    size="base"
                  />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ) : (
        <div className="">
          <Card className="flex flex-col bg-white px-10">
            <div className="flex justify-between items-center">
              <div className="flex gap-2 items-center border-b-1 pb-1">
                <div className="w-fit p-2 rounded-full bg-primary/15">
                  <List className="text-primary" size={15} />
                </div>
                <h3>Bảng dịch vụ</h3>
              </div>
              <Button
                type="button"
                onClick={() => handleAdd()}
                className="w-fit self-end mb-2"
                variant="secondary"
              >
                <div className="flex gap-2 items-center">
                  <PlusCircle />
                  <b>Thêm dịch vụ</b>
                </div>
              </Button>
            </div>

            <DichVuTable
              data={items}
              isAction={true}
              isNew={isNew}
              handleUpdate={setItems}
              services={services}
              serviceFields={serviceFields}
            />
            <div className="flex justify-end pr-10 ">
              <div className="w-fit space-y-1">
                <div className="flex gap-30">
                  <p>Tạm tính:</p>
                  <div className="font-bold text-sm">
                    <ChangeMoney amount={subtotal} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Thuế VAT(10%):</p>
                  <div className="font-bold text-sm">
                    <ChangeMoney amount={vatAmount} />
                  </div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p className="font-bold">Tổng cộng:</p>
                  <div className="text-primary text-sm">
                    <ChangeMoney amount={totalAmount} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
          <div className="flex justify-end mt-2 gap-2">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsOpen(true)}
              disabled={loading}
            >
              Hủy
            </Button>
            <Button
              type="button"
              onClick={handleNext}
              className="w-fit"
              disabled={loading}
            >
              Gửi
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
