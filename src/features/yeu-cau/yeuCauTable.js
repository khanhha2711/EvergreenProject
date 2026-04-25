"use client";

import { DataTable } from "@/components/table/data-table";
import { toast } from "sonner";
import PATH from "@/routes/path";
import { PaginationTable } from "@/components/table/pagination";
import SearchAndSort from "@/components/inputs/searchAndFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { deleteYeuCau } from "@/actions/yeuCauAction";
import { STATEYEUCAU } from "@/constants/yeu-cau";
import { columns } from "./columns";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function YeuCauTable({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);
    setPage(1);
    router.push(`?${params.toString()}`);
  };

  // pagination
  const pageSize = 8;
  const totalPage = Math.ceil(data?.length / pageSize) || 1;
  const dataNew = data?.slice((page - 1) * pageSize, page * pageSize);
  const handleNext = () => {
    if (page < totalPage) {
      setPage(page + 1);
    }
  };

  const handleBack = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleDelete = async (id) => {
    const res = await deleteYeuCau(id);
    if (res.success) {
      toast.success("Xóa thành công");
      router.refresh();
    } else {
      toast.error("Xóa thất bại");
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1>Yêu cầu báo giá</h1>
          <p className="text-muted-foreground">
            Quản lý và theo dõi các yêu cầu báo giá từ khách hàng
          </p>
        </div>
        <Link href={PATH.ADMIN.YEUCAU.TAOMOI}>
          <Button className="whitespace-nowrap"><PlusCircle/>Tạo yêu cầu báo giá</Button>
        </Link>
      </div>

      <Card className="px-4 -space-y-2">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <SearchAndSort
              onSearch={(val) => updateParams("search", val)}
              onFilter={(val) => updateParams("state", val)}
              status={STATEYEUCAU}
              placeholder="Số điện thoại"
            />
          </div>
        </div>
        <DataTable
          data={dataNew}
          columns={columns({ handleDelete })}
          basePath={PATH.ADMIN.YEUCAU.DANHSACH}
          idName={"requestCode"}
        />

        <PaginationTable
          page={page}
          totalPage={totalPage}
          handleNext={handleNext}
          handleBack={handleBack}
          handlePageChange={handlePageChange}
        />
      </Card>
    </div>
  );
}
