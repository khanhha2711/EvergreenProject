"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getDichVuChiTiet } from "@/actions/dichVuAction";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/modal/modal";
import DichVuModal from "./dichVuModal";
import SearchAndFilter from "@/components/inputs/searchAndFilter";

export default function DichVuTable({ data }) {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleDetail = async (id) => {
    console.log(id);
    setIsOpen(true);
    const res = await getDichVuChiTiet(id);
    setDataDetail(res.data);
  };
  const handleEdit = async (id) => {
    setIsEdit(true);
    setIsOpen(true);
    const res = await getDichVuChiTiet(id);
    setDataDetail(res.data);
  };

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`?${params.toString()}`);
  };

  const columns = getColumns({
    handleEdit,
  });

  return (
    <div className="container space-y-4">
      <h2>Danh sách dịch vụ</h2>
      <div className="flex justify-between">
        <SearchAndFilter
          onSearch={(val) => updateParams("search", val)}
          isFilter={false}
        />
        <Button
          onClick={() => {
            setIsCreate(true);
            setIsOpen(true);
            setDataDetail({});
          }}
        >
          + Thêm dịch vụ
        </Button>
      </div>
      {isOpen ? (
        <DichVuModal
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          isCreate={isCreate}
          setIsEdit={setIsEdit}
          setIsCreate={setIsCreate}
          data={dataDetail}
        />
      ) : (
        <DataTable
          onRowClick={(row) => handleDetail(row.serviceCode)}
          data={data}
          columns={columns}
        />
      )}
    </div>
  );
}
