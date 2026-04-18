"use client";

import { DataTable } from "@/components/table/data-table";
import { PaginationTable } from "@/components/table/pagination";
import SearchAndSort from "@/components/inputs/searchAndFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { columns } from "./columns.js";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Modal from "@/components/modal/modal";
import ModalNhanVien from "./modalNhanVien.js";
import { getNhanVienChiTiet } from "@/actions/nhanVienAction.js";

export default function NhanVienTable({ data }) {
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
  console.log(data);
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };
  const handleRowClick = async (row) => {
    const res = await getNhanVienChiTiet(row.employeeCode);
    setDetailData(res.data);
    setIsEdit(false);
    setIsOpen(true);
  };
  return (
    <div className={cn("space-y-2 relative")}>
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <SearchAndSort
            onSearch={(val) => updateParams("search", val)}
            isFilter={false}
          />
          <Button
            type="button"
            className={"absolute top-0 right-0"}
            onClick={() => {
              setIsOpen(true), setIsCreate(true);
            }}
          >
            Thêm nhân viên mới
          </Button>
          {isOpen && (
            <Modal>
              <ModalNhanVien
                setIsOpen={setIsOpen}
                isEdit={isEdit}
                data={detailData}
                setIsEdit={setIsEdit}
                isCreate={isCreate}
                setIsCreate={setIsCreate}
              />
            </Modal>
          )}
        </div>
      </div>
      <DataTable
        data={dataNew}
        columns={columns}
        idName={"employeeCode"}
        onRowClick={(row) => handleRowClick(row)}
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
