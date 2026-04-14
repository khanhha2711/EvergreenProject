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
    companyName: "Công ty TNHH ABC",
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
    const data = { companyName: companyName, list: newData };
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
          {data?.companyName ? (
            <b>{data?.companyName}</b>
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
      <Card>
        
      </Card>
    </div>
  );
};

export default TransportTab;
