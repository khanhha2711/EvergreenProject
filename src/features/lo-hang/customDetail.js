import FileComponent from "@/components/file/file";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CUSTOMFIELDS } from "@/constants/lo-hang";
import { File, X } from "lucide-react";
import React from "react";
import FileTable from "../hop-dong/fileTable";

const CustomDetail = ({ dataDetail, setDataDetail }) => {
  return (
    <div className="px-12 space-y-4">
      <div className="flex justify-between">
        <h3>Thông tin tờ khai hải quan</h3>
        <div className="flex gap-4 items-center">
          <Button>Thông quan</Button>
          <Button
            onClick={() => setDataDetail(null)}
            className="bg-white hover:bg-white text-black"
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3 bg-slate-100 rounded-xl p-6 gap-4">
        {CUSTOMFIELDS.map((field, index) =>
          field.name === "lane" ? (
            <div key={index} className="flex gap-4">
              <label>{field.label}</label>
              <Badge
                variant={
                  dataDetail?.[field.name] === "yellow" ? "done" : "destructive"
                }
              >
                {dataDetail?.[field.name]}
              </Badge>
            </div>
          ) : (
            <div key={index} className="flex gap-4">
              <label>{field.label}</label>
              <b>{dataDetail?.[field.name]}</b>
            </div>
          ),
        )}
      </div>
      <div className=" mt-4">
        <h3 className="font-semibold mb-2">File </h3>
        <div className="bg-green-300/20 flex items-center gap-6 p-2 pl-4 rounded-xl">
          <div className="bg-primary/60 p-2 rounded-sm">
            <File className="text-white" size={20} />
          </div>
          <div>
            <FileTable attachment={dataDetail?.attachment} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomDetail;
