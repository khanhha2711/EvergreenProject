"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CUSTOMFIELDS, LANE, SELECTTITLE } from "@/constants/lo-hang";
import { Dot, File, X } from "lucide-react";
import React, { useState } from "react";
import FileTable from "../hop-dong/fileTable";
import { DataTable } from "@/components/table/data-table";
import { containerViewColumns } from "./customColumn";
import Activity from "./activity";
import { Textarea } from "@/components/ui/textarea";
import { updateHaiQuan } from "@/actions/haiQuanAction";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { SelectComponent } from "@/components/inputs/select";
import z from "zod";

const haiQuanSchema = z.object({
  lane: z.enum(["green", "yellow", "red"], {
    errorMap: () => ({ message: "Vui lòng chọn luồng" }),
  }),
  title: z.string().min(1, "Vui lòng chọn bước xử lý"),
  description: z.string().min(1, "Vui lòng nhập ghi chú"),
});

const CustomDetail = ({ data }) => {
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState(data?.dto?.lane || "");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  console.log(data);

  const handleSubmit = async () => {
    const result = haiQuanSchema.safeParse({
      lane,
      title,
      description,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors(fieldErrors);
      return;
    }

    setErrors({});

    try {
      const res = await updateHaiQuan({
        id: data?.dto?.declarationCode,
        data: {
          lane: result.data.lane,
          logDTO: {
            title: result.data.title,
            description: result.data.description,
          },
        },
      });

      if (!res.success) throw new Error("Có lỗi xảy ra");

      toast.success("Cập nhật thành công");
      router.refresh();
      setDescription("");
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  return (
    <div className="grid grid-cols-4 gap-4 grid-rows-[auto,auto]">
      <Card className="px-6 col-span-3 row-span-1">
        <div className="flex justify-between">
          <h3>Thông tin tờ khai hải quan</h3>
          <div className="flex gap-4 items-center">
            {data?.dto?.lane !== null && <Button>Thông quan</Button>}
          </div>
        </div>
        <div className="grid grid-cols-2 bg-slate-100 rounded-xl p-6 gap-2">
          {CUSTOMFIELDS.map((field, index) => (
            <div key={index} className="flex gap-2">
              <label>{field.label}:</label>
              <b>{data?.dto?.[field.name]}</b>
            </div>
          ))}
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
      {data?.log.length > 0 && (
        <div className="bg-white rounded-xl col-span-1 col-start-4 row-span-2 h-[calc(100vh-120px)] overflow-scroll">
          <h3 className="mb-2 sticky top-0 bg-white p-6">Lịch sử hoạt động</h3>
          {data?.log.map((log, index) => (
            <div key={index}>
              <Activity data={log} user={data?.activityDTO?.user} />
            </div>
          ))}
        </div>
      )}
      {
        <Card className="px-12 col-span-3 h-fit">
          <div className="space-x-4">
            {LANE.map((field, index) => {
              const active = lane === field.value;
              const currentLane = data?.dto?.lane;
              const disabled =
                currentLane !== null && currentLane !== field.value;
              return (
                <Button
                  onClick={() => setLane(field.value)}
                  disabled={disabled}
                  key={index}
                  className={cn(
                    "space-x-4 bg-white hover:bg-white border transition",
                    active &&
                      !disabled &&
                      (field.value === "green"
                        ? "border-primary bg-primary/10 text-primary"
                        : field.value === "red"
                        ? "border-destructive bg-destructive/10 text-destructive"
                        : "border-yellow-400 bg-yellow-100 text-yellow-500"),

                    !active && "border-gray-300 text-gray-500",

                    !active &&
                      (field.value === "green"
                        ? "hover:border-primary hover:text-primary"
                        : field.value === "red"
                        ? "hover:border-destructive hover:text-destructive"
                        : "hover:border-yellow-400 hover:text-yellow-500"),
                  )}
                >
                  <div
                    className={cn(
                      "w-2 h-2 rounded-full",
                      field.value === "green"
                        ? "bg-primary"
                        : field.value === "red"
                        ? "bg-destructive"
                        : "bg-yellow-400",
                    )}
                  ></div>
                  <p
                    className={cn(
                      "text-gray-600",
                      field.value === "green"
                        ? "hover:text-primary"
                        : field.value === "red"
                        ? "hover:text-destructive"
                        : "hover:text-yellow-400",
                    )}
                  >
                    {field.label}
                  </p>
                </Button>
              );
            })}
            {errors.lane && (
              <p className="text-sm text-red-500 mt-1">{errors.lane[0]}</p>
            )}
          </div>
          <div className="w-50 space-y-2">
            <h3>Chọn bước xử lý</h3>
            <SelectComponent
              options={SELECTTITLE}
              placeHolder="Chọn tiêu đề"
              value={title}
              onChange={(value) => setTitle(value)}
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">{errors.title[0]}</p>
            )}
          </div>

          <div>
            <h3>Nội dung xử lý</h3>
            <div className="mt-2">
              <Textarea
                name="description"
                placeholder="Nhập lý do ở đây"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description[0]}
              </p>
            )}
            <div className="flex gap-4 mt-2 justify-end">
              <Button variant="secondary" onClick={() => setDescription("")}>
                Hủy
              </Button>
              <Button onClick={() => handleSubmit()}>Lưu</Button>
            </div>
          </div>
        </Card>
      }
    </div>
  );
};

export default CustomDetail;
