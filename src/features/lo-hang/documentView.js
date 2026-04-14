"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import DocumentModal from "./documentModal";
import { CheckCircle, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./documentColumns";

const DocumentView = ({ id, data }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const handleEdit = async (documentCode) => {
    // const res = await detailChungTu(documentCode);
    // if (res.success) {
    //   setDataDetail(res.data)
    // }
    setIsEdit(true);
    setDataDetail(data[0]);
  };
  const documentColumns = getColumns({ handleEdit });

  return (
    <div className="space-y-4">
      <Card>
        {isCreate || isEdit ? (
          <DocumentModal
            id={id}
            dataDetail={dataDetail}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setDataDetail={setDataDetail}
          />
        ) : (
          <div>
            <div className="flex justify-between border-b pb-4 px-6">
              <div className="flex gap-2 items-center">
                <div className="bg-primary/10 w-fit p-2 rounded-2xl">
                  <CheckCircle className="text-primary" size={15} />
                </div>
                <h3>Danh sách chứng từ </h3>
              </div>
              <Button
                className="text-primary-foreground"
                onClick={() => {
                  setIsCreate(true);
                }}
              >
                + Thêm chứng từ
              </Button>
            </div>

            {data?.length === 0 ? (
              <div className="flex justify-center py-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-400/20 p-3 rounded-full">
                    <FileUp size={25} className="text-gray-600" />
                  </div>
                  <div className="font-semibold text-lg">Cập nhật chứng từ</div>
                </div>
              </div>
            ) : (
              <div className="px-10 mt-4">
                <DataTable data={data} columns={documentColumns} />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default DocumentView;
