"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, FileUp } from "lucide-react";
import { useState } from "react";
import CustomModal from "./customModal";
import CustomDetail from "./customDetail";

const CustomView = ({ data, id }) => {
  const [isCreate, setIsCreate] = useState(false);
  return (
    <div>
      <div>
        {isCreate ? (
          <CustomModal id={id} setIsCreate={setIsCreate} />
        ) : data.length !== 0 ? (
          <CustomDetail data={data} />
        ) : (
          <Card>
            <div className="flex justify-between border-b pb-4 px-6">
              <div className="flex gap-2 items-center">
                <div className="bg-primary/10 w-fit p-2 rounded-2xl">
                  <CheckCircle className="text-primary" size={15} />
                </div>
                <h3>Tờ khai hải quan</h3>
              </div>
              {data?.length !== 0 && (
                <Button
                  className="text-primary-foreground"
                  onClick={() => {
                    setIsCreate(true);
                  }}
                >
                  + Thêm tờ khai hải quan
                </Button>
              )}
            </div>

            <div className="flex justify-center py-6">
              <div className="flex flex-col items-center gap-4">
                <div className="bg-gray-400/20 p-4 rounded-full">
                  <FileUp size={35} className="text-gray-400 " />
                </div>
                <div className="font-semibold text-xl">
                  Chưa có dữ liệu tờ khai hải quan
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
                  + Thêm tờ khai hải quan
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CustomView;
