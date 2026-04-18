"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PATH from "@/routes/path";
import { toast } from "sonner";
import { createBaoGia } from "@/actions/baoGiaAction";
import { useState } from "react";

export function CreateBaoGiaButton({ requestId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await createBaoGia(requestId);

      if (!res?.success || !res?.data?.id) {
        setIsLoading(false);
        throw new Error("Tạo thất bại");
      }
      setIsLoading(false);
      router.push(PATH.ADMIN.BAOGIA.CHITIET(res.data.id));
    } catch (error) {
      toast.error("Tạo báo giá thất bại");
    }
  };

  return (
    <Button onClick={() => handleCreate()} disabled={isLoading}>
      {isLoading ? "Đang tạo ..." : "Tạo báo giá"}
    </Button>
  );
}
