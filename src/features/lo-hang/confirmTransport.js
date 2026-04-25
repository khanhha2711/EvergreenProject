"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { updateLoHang } from "@/actions/loHangActions";

const ConfirmTransport = ({ id }) => {
  const router = useRouter();

  const handleChangeStatus = async () => {
    const res = await updateLoHang({ id, data: { status: "TRANSPORT" } });
    if (res.success) {
      toast.success("Cập nhật thành công");
      router.refresh();
    }
  };
  return (
    <div>
      <div className="fixed bottom-0 left-55 right-0 bg-white border-t px-6 py-4 flex items-center justify-between shadow-md mt-2">
        <div className="flex items-center gap-2">
          <TriangleAlert className="text-destructive" size={20} />
          <div>
            <p className="text-sm text-gray-500">
              Sau khi xác nhận, bạn sẽ không thể chỉnh sửa thông tin booking
            </p>
            <p className="text-sm text-gray-500">
              Vui lòng kiểm tra kỹ thông tin trước khi xác nhận
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button onClick={() => handleChangeStatus()}>
            Xác nhận hoàn thành
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmTransport;
