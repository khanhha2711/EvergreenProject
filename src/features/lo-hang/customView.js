"use client";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, FileUp } from "lucide-react";
import { useState } from "react";
import { customColumns } from "./customColumn";
import CustomModal from "./customModal";
import CustomDetail from "./customDetail";
import { detailHaiQuan } from "@/actions/haiQuanAction";

const CustomView = ({ data, id }) => {
  const [isCreate, setIsCreate] = useState(false);
  const [dataDetail, setDataDetail] = useState(null);

  const handleDetail = async (customCode) => {
    const res = await detailHaiQuan(customCode);
    const dataDetail = res.data;
    setDataDetail(dataDetail);
  };
  console.log(data.length !== 0);

  return (
    <div>
      <Card>
        {dataDetail ? (
          <CustomDetail dataDetail={dataDetail} setDataDetail={setDataDetail} />
        ) : isCreate ? (
          <CustomModal id={id} data={dataDetail} setIsCreate={setIsCreate} />
        ) : (
          <div>
            <div className="flex justify-between border-b pb-4 px-6">
              <div className="flex gap-2 items-center">
                <div className="bg-primary/10 w-fit p-2 rounded-2xl">
                  <CheckCircle className="text-primary" size={15} />
                </div>
                <h3>Tờ khai hải quan</h3>
              </div>
              <Button
                onClick={() => {
                  setIsCreate(true);
                }}
                className="text-primary-foreground"
              >
                + Thêm tờ khai hải quan
              </Button>
            </div>

            {data?.length === 0 ? (
              <div className="flex justify-center py-6">
                <div className="flex flex-col items-center gap-4">
                  <div className="bg-gray-400/20 p-3 rounded-full">
                    <FileUp size={25} className="text-gray-600" />
                  </div>
                  <div className="font-semibold text-lg">
                    Thêm mới tờ khai hải quan
                  </div>
                </div>
              </div>
            ) : (
              <div className="px-10 mt-4">
                <DataTable
                  onRowClick={(e) => handleDetail(e.declarationCode)}
                  data={data}
                  columns={customColumns}
                />
              </div>
            )}
          </div>
        )}
      </Card>
    </div>
  );
};

export default CustomView;
