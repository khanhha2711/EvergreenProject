"use client";
import { DataTable } from "@/components/table/data-table";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { truckColumn } from "./truckColumn";
import { Dot, Ship, Tally1 } from "lucide-react";
import { Button } from "@/components/ui/button";
import z from "zod";

const truckSchema = z.object({
  licensePlate: z.string().min(2, "Không được để trống"),

  driverName: z.string().min(1, "Không được để trống"),

  driverPhone: z
    .string()
    .regex(/^[0-9]{10}$/, "Số điện thoại phải có 10 chữ số"),
});

const TransportTab = () => {
  const data = {
    companyTruckName: "jjjjjjjjjjjjjjjjj",
    list: [
      {
        truckCode: "123",
        licensePlate: "asf",
        driverName: "sasd",
        driverPhone: "0332158357",
      },
    ],
  };
  const [dataTruck, setDataTruck] = useState(data.list);
  const [isNew, setIsNew] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const handleAddTruck = () => {
    setDataTruck((prev) => [
      ...prev,
      { truckCode: "", licensePlate: "", driverName: "", driverPhone: "" },
    ]);
    setIsNew(true);
  };
  const handleOnChange = ({ id, field, value }) => {
    setDataTruck((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, [field]: value } : item,
      ),
    );
  };

  const handleSubmit = () => {
    setIsNew(false);
    const newData = dataTruck
      .filter((data) => data.truckCode === "")
      .map(({ truckCode, ...rest }) => rest);
    const data = { companyTruckName: companyName, list: newData };
    console.log(data);
  };

  const handleDelete = (id) => {};
  const column = truckColumn({ isNew, handleOnChange, handleDelete });
  return (
    <div>
      <Card className="px-12">
        <div className="flex items-center gap-2">
          <Ship size={20} />
          <h3>Thông tin nội địa</h3>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName">Tên đơn vị vận tải</label>
          {data?.companyTruckName ? (
            <b>{data?.companyTruckName}</b>
          ) : (
            <Input
              className="mt-2"
              id="companyName"
              name="companyName"
              placeholder="Nhập tên đơn vị vận chuyển"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          )}
        </div>
        <div className="flex justify-between">
          <p>Thông tin chuyển xe</p>
          <Button
            onClick={() => {
              handleAddTruck();
            }}
          >
            + Thêm chuyến xe
          </Button>
        </div>
        <DataTable data={dataTruck} columns={column} />

        <div className="flex justify-end gap-4">
          <Button variant="secondary">Hủy</Button>
          <Button onClick={() => handleSubmit()}>Lưu</Button>
        </div>
      </Card>
      <Card className="flex">
        <div className="flex flex-row gap-4">
          <div className="border-l-3 relative ml-4 ">
            <div className="absolute -top-6.5 -left-6.5">
              <Dot size={50} className="text-primary" />
            </div>
            <div className="h-15 w-fit"></div>
          </div>
          <div>
            <b>Chờ lấy hàng</b>
            <p>22/2/2026</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TransportTab;
