"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import PATH from "@/routes/path";
import { toast } from "sonner";
import { createBaoGia } from "@/actions/baoGiaAction";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export function CreateBaoGiaButton({ requestId }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleCreate = async () => {
    setIsLoading(true);
    try {
      const res = await createBaoGia(requestId);
      console.log(res);
      if (res.success) {
        router.push(PATH.ADMIN.BAOGIA.CHITIET(res.data.quotationCode));
      } else {
        toast.error("Tạo báo giá thất bại");
      }
    } catch (error) {
      toast.error("Tạo báo giá thất bại");
    }
  };

  return (
    <Button onClick={() => handleCreate()} disabled={isLoading}>
      {isLoading ? (
        "Đang tạo ..."
      ) : (
        <div className="flex gap-2 items-center">
          <PlusCircle />
          <p>Tạo báo giá</p>
        </div>
      )}
    </Button>
  );
}
