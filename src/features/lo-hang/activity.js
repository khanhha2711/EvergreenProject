import { Card } from "@/components/ui/card";
import { FileEdit } from "lucide-react";
import React from "react";

const Activity = ({ data, user }) => {
  return (
    <div className="flex gap-10 items-start ml-4">
      <div className="relative top-6.5">
        <div className="bg-primary/50 rounded-2xl w-fit p-2 absolute -top-8 -left-3.5">
          <FileEdit className=" text-white" size={15} />
        </div>
        <div className="h-20 w-0.5 bg-gray-400"></div>
      </div>
      <Card className="-space-y-5.5 px-4 py-2 flex-1">
        <div className="flex justify-between ">
          <div className="flex gap-2">
            <p className="text-sm text-gray-700">Người thực hiện: </p>
            <b className="text-sm text-gray-600">{user}</b>
          </div>
          <p className="bg-primary/10 rounded-2xl px-2.5 py-1 text-sm mr-12">
            {data?.createdAt}
          </p>
        </div>
        <p className=" font-bold text-base">{data?.description}</p>
        {data?.documentName && (
          <div className=" flex gap-2  ">
            <p className="text-sm text-gray-700">Tên chứng từ:</p>
            <b className="text-sm text-gray-600">{data?.documentName}</b>
          </div>
        )}
      </Card>
    </div>
  );
};

export default Activity;
