"use client";

import { DataTable } from "@/components/table/data-table";
import { PaginationTable } from "@/components/table/pagination";
import SearchAndSort from "@/components/inputs/searchAndFilter";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Modal from "@/components/modal/modal";
import VanTaiModal from "./vanTaiModal";
import {
  detailVanTaiHangTau,
  detailVanTaiNoiDia,
} from "@/actions/vanTaiAction";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function VanTaiTable({ dataTable, vanTaiColumns }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [noiDia, setNoiDia] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [page, setPage] = useState(1);
  const [detailData, setDetailData] = useState(null);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    setPage(1);
    router.push(`?${params.toString()}`);
  };
  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "noi-dia") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setNoiDia(true);
    } else if (tab === "hang-tau") {
      setNoiDia(false);
    } else {
      setNoiDia(true);
    }
  }, [searchParams]);

  // pagination
  const pageSize = 8;
  const totalPage = Math.ceil(dataTable?.length / pageSize) || 1;
  const dataNew = dataTable?.slice((page - 1) * pageSize, page * pageSize);
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

  const getData = async (row) => {
    const id = noiDia ? row.companyCode : row.shippingCode;
    const res = noiDia
      ? await detailVanTaiNoiDia(id)
      : await detailVanTaiHangTau(id);

    if (res.success) {
      setDetailData(res.data);
      setIsOpen(true);
      return;
    }
  };
  return (
    <Card className="-space-y-2 px-4">
      {isOpen && (
        <Modal>
          <VanTaiModal
            data={detailData}
            noiDia={noiDia}
            isCreate={isCreate}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setIsOpen={setIsOpen}
            setIsCreate={setIsCreate}
          />
        </Modal>
      )}
      <div className="flex items-center justify-between gap-4">
        <div className="flex-1">
          <SearchAndSort
            onSearch={(val) => updateParams("search", val)}
            isFilter={false}
            placeholder="Tên công ty"
          />
        </div>

        <Button
          className="whitespace-nowrap"
          onClick={() => {
            setIsCreate(true);
            setIsEdit(false);
            setIsOpen(true);
          }}
        >
          <PlusCircle /> Tạo mới
        </Button>
      </div>
      <DataTable
        data={dataNew}
        columns={vanTaiColumns}
        onRowClick={(row) => getData(row)}
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
