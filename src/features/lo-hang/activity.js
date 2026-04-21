import { Card } from "@/components/ui/card";
import { SELECTTITLE } from "@/constants/lo-hang";
import { FileEdit } from "lucide-react";
import React from "react";

const Activity = ({ data, user }) => {
  return (
    <div className="flex gap-4 px-6">
      <div className="flex flex-col items-center w-10">
        <div className="bg-primary/80 rounded-2xl w-fit p-2">
          <FileEdit className=" text-white" size={10} />
        </div>
        <div className="bg-gray-300 flex-1 w-0.5"></div>
      </div>

      <div className="py-3 space-y-2">
        <p className="text-sm font-bold">
          {SELECTTITLE.find((title) => title.value === data?.title)?.label}
        </p>
        <p className="text-sm">{data?.description}</p>
        <p className="text-xs text-gray-400">{data?.createdAt}</p>
        <p className="text-xs text-gray-400">{user}</p>
      </div>
    </div>
  );
};

export default Activity;
