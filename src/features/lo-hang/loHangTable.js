"use client";

import { DataTable } from "@/components/table/data-table";
import PATH from "@/routes/path";
import { PaginationTable } from "@/components/table/pagination";
import SearchAndSort from "@/components/inputs/searchAndFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";
import { STATELOHANG } from "@/constants/lo-hang";

export default function LoHangTable({ data }) {
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
  const totalPage = Math.ceil(data?.length / pageSize);
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

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <SearchAndSort
            onSearch={(val) => updateParams("search", val)}
            onFilter={(val) => updateParams("state", val)}
            status={STATELOHANG}
          />
        </div>
      </div>
      <DataTable
        data={dataNew || ""}
        columns={columns}
        basePath={PATH.ADMIN.LOHANG.DANHSACH}
        idName={"shipmentCode"}
      />

      <PaginationTable
        page={page}
        totalPage={totalPage}
        handleNext={handleNext}
        handleBack={handleBack}
        handlePageChange={handlePageChange}
      />
    </div>
  );
}
