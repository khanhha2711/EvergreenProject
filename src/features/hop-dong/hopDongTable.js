"use client";

import { DataTable } from "@/components/table/data-table";
import { PaginationTable } from "@/components/table/pagination";
import SearchAndSort from "@/components/inputs/searchAndFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { columns } from "./column";
import { CONTRACTSTATUS } from "@/constants/hop-dong";
import PATH from "@/routes/path";
import { Card } from "@/components/ui/card";

export default function HopDongTable({ data }) {
  console.log(data);

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
  const pageSize = 9;
  const totalPage = Math.ceil(data.length / pageSize);
  const dataNew = data.slice((page - 1) * pageSize, page * pageSize);
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
  const handleDownload = (id) => {};

  return (
    <Card className={cn("-space-y-2 px-4 relative")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <SearchAndSort
            onSearch={(val) => updateParams("search", val)}
            status={CONTRACTSTATUS}
            onFilter={(val) => updateParams("state", val)}
            placeholder="Mã hợp đồng"
          />
        </div>
      </div>
      <DataTable
        data={dataNew}
        columns={columns({ handleDownload, pageSize, page })}
        idName={"contractCode"}
        basePath={PATH.ADMIN.HOPDONG.DANHSACH}
      />

      <PaginationTable
        page={page}
        totalPage={totalPage}
        handleNext={handleNext}
        handleBack={handleBack}
        handlePageChange={handlePageChange}
      />
    </Card>
  );
}
