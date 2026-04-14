import FileComponent from "@/components/file/file";
import { Button } from "@/components/ui/button";
import { DOCUMENTFIELDS } from "@/constants/lo-hang";
import { X } from "lucide-react";
import React from "react";

const DocumentDetail = ({ dataDetail, setIsEdit, setDataDetail }) => {
  const handleOpenFile = () => {
    window.open(
      `/api/file?path=${dataDetail?.attachment.downloadURL}`,
      "_blank",
    );
  };
  return (
    <div className="px-12 space-y-4">
      <div className="flex justify-between">
        <h3>Thông tin chứng từ</h3>
        <div className="flex gap-4 items-center">
          <Button onClick={() => setIsEdit(true)}>Chỉnh sửa</Button>
          <Button
            onClick={() => setDataDetail(null)}
            className="bg-white hover:bg-white text-black "
          >
            <X />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-3">
        {DOCUMENTFIELDS.slice(0, 3).map((field, index) => (
          <div key={index}>
            <p>{field.label}</p>
            <b>{dataDetail?.[field.name]}</b>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <h3>File chứng từ</h3>
        <div onClick={handleOpenFile}>
          <FileComponent
            fileName={dataDetail?.attachment?.fileName}
            disable={true}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentDetail;
