"use client";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./columns";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { getDichVuChiTiet, updateDichVu } from "@/actions/dichVuAction";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "@/components/modal/modal";
import DichVuModal from "./dichVuModal";
import SearchAndFilter from "@/components/inputs/searchAndFilter";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { PlusCircle } from "lucide-react";

export default function DichVuTable({ data }) {
  const [isCreate, setIsCreate] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataDetail, setDataDetail] = useState({});
  const [isOpen, setIsOpen] = useState(false);
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

  const handleOnChange = async ({ value, id }) => {
    const res = await updateDichVu({ data: { status: value }, id });
    if (res.success) {
      toast.success("Cập nhật thành công");
      router.refresh();
    }
  };
  const columns = getColumns({
    handleOnChange,
  });

  return (
    <div className="container space-y-4">
      <div className="space-y-2">
        <h2>Danh sách dịch vụ</h2>
        <p className="text-muted-foreground">
          Quản lý và theo dõi các dịch vụ đang cung cấp trong hệ thống
        </p>
      </div>
      {isEdit || isCreate ? (
        ""
      ) : (
        <Card className="-space-y-2 px-4">
          <div className="flex justify-between">
            <SearchAndFilter
              onSearch={(val) => updateParams("search", val)}
              isFilter={false}
              placeholder={'Tên dịch vụ'}
            />
            <Button
              onClick={() => {
                setIsCreate(true);
                setIsOpen(true);
                setDataDetail({});
              }}
            >
              <PlusCircle /> Thêm dịch vụ
            </Button>
          </div>
          <DataTable
            onRowClick={(row) => handleDetail(row.serviceCode)}
            data={data}
            columns={columns}
          />
        </Card>
      )}
      {isOpen && (
        <DichVuModal
          setIsOpen={setIsOpen}
          isEdit={isEdit}
          isCreate={isCreate}
          setIsEdit={setIsEdit}
          setIsCreate={setIsCreate}
          data={dataDetail}
        />
      )}
    </div>
  );
}
