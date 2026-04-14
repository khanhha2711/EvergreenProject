"use client";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import DocumentModal from "./documentModal";
import { CheckCircle, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/table/data-table";
import { getColumns } from "./documentColumns";
import DocumentDetail from "./documentDetail";
import Activity from "./activity";
import { detailChungTu } from "@/actions/chungTuAction";

const DocumentView = ({ id, data }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const fetchDataDetail = async (documentCode) => {
    const res = await detailChungTu(documentCode);
    if (res.success) {
      setDataDetail(res.data);
    }
  };
  const handleEdit = async (documentCode) => {
    fetchDataDetail(documentCode);
    setIsEdit(true);
  };

  const handleDetail = (documentCode) => {
    fetchDataDetail(documentCode);
  };
  const documentColumns = getColumns({ handleEdit });
  return (
    <div className="space-y-4">
      <Card>
        {isCreate || (isEdit && dataDetail) ? (
          <DocumentModal
            id={id}
            dataDetail={dataDetail?.list}
            setIsCreate={setIsCreate}
            isCreate={isCreate}
            isEdit={isEdit}
            setIsEdit={setIsEdit}
            setDataDetail={setDataDetail}
            fetchData={fetchDataDetail}
          />
        ) : dataDetail ? (
          <DocumentDetail
            setIsEdit={setIsEdit}
            dataDetail={dataDetail?.list}
            setDataDetail={setDataDetail}
          />
        ) : (
          <div>
            <div className="flex justify-between border-b pb-2 px-12">
              <div className="flex gap-2 items-center">
                <div className="bg-primary/10 w-fit p-2 rounded-2xl">
                  <CheckCircle className="text-primary" size={15} />
                </div>
                <h3>Danh sách chứng từ </h3>
              </div>
              {data?.length !== 0 && (
                <Button
                  className="text-primary-foreground"
                  onClick={() => {
                    setIsCreate(true);
                  }}
                >
                  + Thêm chứng từ
                </Button>
              )}
            </div>

            {data?.length === 0 ? (
              <div className="flex justify-center py-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-400/20 p-4 rounded-full">
                    <FileUp size={35} className="text-gray-400 " />
                  </div>
                  <div className="font-semibold text-xl">
                    Chưa có dữ liệu chứng từ
                  </div>
                  <p className="text-lg">
                    Bắt đầu bằng cách tải lên các tài liệu đầu tiên để quản lý
                  </p>
                  <p className="text-lg -mt-4">và theo dõi lịch sử cập nhật.</p>
                  <Button
                    className="text-primary-foreground mt-4"
                    onClick={() => {
                      setIsCreate(true);
                    }}
                  >
                    + Thêm chứng từ
                  </Button>
                </div>
              </div>
            ) : (
              <div className="px-10 mt-4">
                <DataTable
                  onRowClick={(e) => handleDetail(e.documentCode)}
                  data={data}
                  columns={documentColumns}
                />
              </div>
            )}
          </div>
        )}
      </Card>
      {dataDetail?.log.length > 0 && (
        <div className="space-y-4 mx-6 mb-6">
          <h3>Lịch sử cập nhật</h3>
          {dataDetail?.log.map((data, index) => (
            <div key={index}>
              <Activity data={data} user={dataDetail?.activity?.user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DocumentView;
