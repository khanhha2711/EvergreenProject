"use client";

import { DataTable } from "@/components/table/data-table";
import { PaginationTable } from "@/components/table/pagination";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Modal from "@/components/modal/modal";
import ModalKhachHang from "./modalKhacHang";
import { getKhachHangChiTiet } from "@/actions/khachHangAction";
import SearchAndFilter from "@/components/inputs/searchAndFilter";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function KhachHangTable({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [page, setPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [detailData, setDetailData] = useState(null);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);
    setPage(1);
    router.push(`?${params.toString()}`);
  };

  // pagination
  const pageSize = 13;
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
  const handleRowClick = async (row) => {
    const res = await getKhachHangChiTiet(row.customerCode);
    setDetailData(res.data);
    setIsOpen(true);
  };
  return (
    <Card className={cn("-space-y-2 px-4")}>
      <div className="flex items-center justify-between gap-4">
        <SearchAndFilter
          onSearch={(val) => updateParams("search", val)}
          isFilter={false}
          placeholder='Số điện thoại'
        />
        <Button
          className={""}
          onClick={() => {
            setIsOpen(true), setIsCreate(true);
          }}
        >
          <PlusCircle />
          Thêm khách hàng mới
        </Button>
      </div>
      {isOpen && (
        <Modal>
          <ModalKhachHang
            setIsOpen={setIsOpen}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            data={detailData}
            isCreate={isCreate}
            setIsCreate={setIsCreate}
          />
        </Modal>
      )}
      <DataTable
        data={dataNew}
        columns={columns}
        idName={"customerCode"}
        onRowClick={(row) => handleRowClick(row)}
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
