"use client";

import { updateState } from "@/actions/baoGiaAction";
import Modal from "@/components/modal/modal";
import { Button } from "@/components/ui/button";
import PATH from "@/routes/path";
import { sendEmailService } from "@/service/sendEmailService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import ContractForm from "../hop-dong/contractForm";

export const State = ({ id, state, data }) => {
  const [currentState, setCurrentState] = useState(state);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const normalizedState = currentState?.toLowerCase();
  const router = useRouter();

  const handleUpdateState = async (newState, options = {}) => {
    if (loading) return;

    setCurrentState(newState);
    setLoading(true);

    try {
      if (options.sendEmail) {
        await sendEmailService({ type: "BAOGIA", data });
      }

      await updateState({ id, state: newState.toUpperCase() });
      router.refresh();
      setLoading(false);
      toast.success("Cập nhật trạng thái thành công");
    } catch (error) {
      setCurrentState(state);
      toast.error("Cập nhật thất bại");
    } finally {
    }
  };

  const createContract = async () => {
    try {
      setLoading(true);

      await updateState({ id, state: "DONE" });

      router.push(`${PATH.ADMIN.HOPDONG.TAOMOI}?baoGiaId=${id}`);
    } catch (error) {
      toast.error("Tạo hợp đồng thất bại");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      {isOpen && (
        <Modal>
          <ContractForm id={id} setIsOpen={setIsOpen} />
        </Modal>
      )}
      {normalizedState === "draft" && (
        <div className="flex gap-6">
          <Link href={PATH.ADMIN.BAOGIA.CHINHSUA(id)}>
            <Button variant="secondary" className="bg-white" disabled={loading}>
              Chỉnh sửa
            </Button>
          </Link>

          <Button
            onClick={() => handleUpdateState("send", { sendEmail: true })}
            disabled={loading}
          >
            {loading ? "Đang gửi ..." : "Gửi báo giá"}
          </Button>
        </div>
      )}

      {/* SEND */}
      {normalizedState === "send" && (
        <div className="flex gap-6 ">
          <Link href={PATH.ADMIN.BAOGIA.CHINHSUA(id)}>
            <Button variant="outline" disabled={loading}>
              Chỉnh sửa
            </Button>
          </Link>

          <Button
            onClick={() => handleUpdateState("rejected")}
            disabled={loading}
            className="bg-badge-1 text-badge-1-foreground hover:bg-badge-1-foreground/30"
          >
            Khách hàng từ chối
          </Button>

          <Button
            onClick={() => handleUpdateState("approved")}
            disabled={loading}
            className="bg-badge-4 text-badge-4-foreground hover:bg-badge-4-foreground/30"
          >
            Khách hàng chấp nhận
          </Button>
        </div>
      )}

      {/* APPROVED */}
      {normalizedState === "approved" && (
        <Button disabled={loading} onClick={createContract}>
          {loading ? "Đang tải..." : "Tạo hợp đồng"}
        </Button>
      )}
    </div>
  );
};
