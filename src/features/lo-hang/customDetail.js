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
import { updateLoHang } from "@/actions/loHangActions";

const haiQuanSchema = z.object({
  lane: z.enum(["green", "yellow", "red"], {
    errorMap: () => ({ message: "Vui lòng chọn luồng" }),
  }),
  title: z.string().min(1, "Vui lòng chọn bước xử lý"),
  description: z.string().optional(),
});

const CustomDetail = ({ data, id }) => {
  const [description, setDescription] = useState("");
  const [lane, setLane] = useState(data?.dto?.lane || "");
  const [title, setTitle] = useState("");
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const handleSubmit = async () => {
    let titleNew;
    if (data?.dto?.lane === "NULL") {
      titleNew = "RECEIVE_LANE";
    } else {
      titleNew = title;
    }
    const result = haiQuanSchema.safeParse({
      lane,
      title: titleNew,
      description: description,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    const dataNew = {
      lane: result.data.lane,
      logDTO: {
        title: result.data.title,
        description: result.data.description,
      },
    };
    console.log(result, dataNew);
    try {
      const res = await updateHaiQuan({
        id: data?.dto?.declarationCode,
        data: dataNew,
      });
      if (!res.success) throw new Error("Có lỗi xảy ra");
      else {
        toast.success("Cập nhật thành công");
        if (lane === "green") {
          handleUpdateShipment();
        }
        router.refresh();
      }

      setDescription("");
    } catch (err) {
      toast.error(err.message || "Có lỗi xảy ra");
    }
  };

  const handleUpdateShipment = async () => {
    try {
      const res = await updateLoHang({
        id: id,
        data: { status: "CLEARANCE" },
      });
      if (res.success) {
        toast.success("Cập nhật thành công");
        router.refresh();
      } else {
        throw new Error("Có lỗi xảy ra");
      }
    } catch (error) {
      toast.error("Có lỗi xảy ra Hãy thực hiện lại");
    }
  };
  return (
    <div className="grid grid-cols-[1fr,minmax(240px,320px)] gap-4">
      <Card className="px-6">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <h3>Thông tin tờ khai hải quan</h3>
            {data.dto.lane !== "NULL" && (
              <Badge
                variant={
                  LANE.find((lane) => lane.value === data?.dto?.lane)?.variant
                }
              >
                {LANE.find((lane) => lane.value === data?.dto?.lane)?.label}
              </Badge>
            )}
          </div>
          <div className="flex gap-4 items-center">
            {data?.dto?.status === "DONE" ? (
              <Badge>Đã thông quan</Badge>
            ) : (
              data?.dto?.lane !== "NULL" && (
                <Button onClick={() => handleUpdateShipment()}>
                  Thông quan
                </Button>
              )
            )}
          </div>
        </div>
        <div className="grid grid-cols-2 h-fit bg-slate-100 rounded-xl p-6 gap-2">
          {CUSTOMFIELDS.map((field, index) => (
            <div key={index} className="flex gap-6">
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
      {data?.dto?.status !== "DONE" && (
        <Card className="px-12 -space-y-2">
          <h3>Chọn luồng xử lý</h3>
          <div className="space-x-4">
            {LANE.map((field, index) => {
              const active = lane === field.value;
              const currentLane = data?.dto?.lane;
              const disabled =
                currentLane !== "NULL" &&
                currentLane !== field.value &&
                title !== "CHANGE_LANE";

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
          {data?.dto?.lane !== "NULL" && data?.dto?.lane !== "green" && (
            <>
              <div className="w-100 space-y-2">
                <h3>Chọn bước xử lý</h3>
                <SelectComponent
                  options={SELECTTITLE.slice(0, 3)}
                  placeHolder="Chọn tiêu đề"
                  value={title}
                  onChange={(value) => setTitle(value)}
                />
                <p className="text-muted-foreground w-full">
                  Vui lòng chọn bước xử lý phù hợp với trạng thái hiện tại
                </p>
                {errors.title && (
                  <p className="text-sm text-red-500 mt-1">{errors.title[0]}</p>
                )}
              </div>

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
            </>
          )}

          <div>
            <div className="flex gap-4 mt-2">
              {data?.dto?.lane !== "NULL" && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    setDescription(""), setLane("");
                  }}
                >
                  Hủy
                </Button>
              )}
              <Button onClick={() => handleSubmit()}>
                {lane === "green" ? "Lưu và thông quan" : "Lưu và theo dõi"}
              </Button>
            </div>
          </div>
        </Card>
      )}
      <div className="col-start-2 row-start-1  ">
        <Card className="bg-white rounded-xl overflow-y-scroll -space-y-4">
          <h3 className="sticky top-0 bg-white rounded-t-xl px-6  pb-2">
            Lịch sử hoạt động
          </h3>
          {data?.log.length > 0 ? (
            data?.log.map((log, index) => (
              <div key={index}>
                <Activity data={log} user={data?.activityDTO?.user} />
              </div>
            ))
          ) : (
            <p className="mx-6">Chưa có lịch sử</p>
          )}
        </Card>
      </div>
    </div>
  );
};

export default CustomDetail;
