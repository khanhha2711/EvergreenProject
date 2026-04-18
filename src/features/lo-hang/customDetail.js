"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CUSTOMFIELDS } from "@/constants/lo-hang";
import { File, X } from "lucide-react";
import React, { useState } from "react";
import FileTable from "../hop-dong/fileTable";
import { DataTable } from "@/components/table/data-table";
import { containerViewColumns } from "./customColumn";
import Activity from "./activity";
import { Textarea } from "@/components/ui/textarea";
import { updateHaiQuan } from "@/actions/haiQuanAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CustomDetail = ({ data }) => {
  const [description, setDescription] = useState("");

  const router = useRouter();
  console.log(data);
  const handleSubmit = async () => {
    try {
      const res = await updateHaiQuan({
        id: data?.dto?.declarationCode,
        data: { description: description },
      });
      if (res.success) {
        toast.success("Cập nhật thành công");
        router.refresh();
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error(error.message || "Có lỗi xảy ra");
    } finally {
      setDescription("");
    }
  };

  return (
    <div className="space-y-4">
      <Card className="px-12">
        <div className="flex justify-between">
          <h3>Thông tin tờ khai hải quan</h3>
          <div className="flex gap-4 items-center">
            {data?.dto?.lane !== "green" && <Button>Thông quan</Button>}
          </div>
        </div>
        <div className="grid grid-cols-3 bg-slate-100 rounded-xl p-6 gap-4">
          {CUSTOMFIELDS.map((field, index) =>
            field.name === "lane" ? (
              <div key={index} className="flex gap-4">
                <label>{field.label}:</label>
                <Badge
                  variant={
                    data?.dto?.[field.name] === "yellow"
                      ? "done"
                      : data?.dto?.[field.name] === "green"
                      ? "default"
                      : "destructive"
                  }
                >
                  {
                    CUSTOMFIELDS.find(
                      (custom) => custom.name === "lane",
                    ).options.find(
                      (option) => option.value === data?.dto?.[field.name],
                    ).label
                  }
                </Badge>
              </div>
            ) : (
              <div key={index} className="flex gap-4">
                <label>{field.label}:</label>
                <b>{data?.dto?.[field.name]}</b>
              </div>
            ),
          )}
        </div>
        <div>
          <h3 className="mb-4">Danh sách container</h3>
          <DataTable columns={containerViewColumns} data={data?.container} />
        </div>
        <div>
          <h3 className="font-semibold mb-2">File </h3>
          <div className="bg-green-300/20 flex items-center gap-6 p-2 pl-4 rounded-xl">
            <div className="bg-primary/60 p-2 rounded-sm">
              <File className="text-white" size={20} />
            </div>
            <div>
              <FileTable attachment={data?.attachment} />
            </div>
          </div>
        </div>
      </Card>
      {data?.dto?.lane !== "green" && (
        <Card className="px-12">
          <div className="col-span-full">
            <h3>Lý do</h3>
            <div className="mt-2">
              <Textarea
                name="description"
                placeholder="Nhập lý do ở đây"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mt-2 justify-end">
              <Button variant="secondary" onClick={() => setDescription("")}>
                Hủy
              </Button>
              <Button onClick={() => handleSubmit()}>Lưu</Button>
            </div>
          </div>
        </Card>
      )}

      {data?.log.length > 0 && (
        <div className="space-y-4 mx-6 mb-6">
          <h3>Lịch sử hoạt động</h3>
          {data?.log.map((log, index) => (
            <div key={index}>
              <Activity data={log} user={data?.activityDTO?.user} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDetail;
