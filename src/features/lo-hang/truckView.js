"use client";
import ComboboxComponent from "@/components/inputs/combobox";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ship, Truck } from "lucide-react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { truckColumn } from "./truckColumn";
import {
  createVanChuyenNoiDia,
  deleteVanChuyenNoiDia,
  optionSelect,
  selectContainer,
  updateVanChuyenNoiDia,
} from "@/actions/vanTaiAction";
import { toast } from "sonner";
import z from "zod";

export const truckSchema = z.object({
  licensePlate: z.string().min(1, "Biển số xe không được để trống"),
  driverName: z.string().min(1, "Tên tài xế không được để trống"),
  driverPhone: z
    .string()
    .min(10, "SĐT không hợp lệ")
    .regex(/^[0-9]+$/, "SĐT chỉ được chứa số"),
  containerNumber: z.string().min(1, "Chưa chọn container"),
});

export const formSchema = z.object({
  companyName: z.string().min(1, "Chưa chọn đơn vị vận tải"),
  trucks: z.array(truckSchema).min(1, "Phải có ít nhất 1 chuyến xe"),
});

const TruckView = ({ id, data }) => {
  const [dataTruck, setDataTruck] = useState(data?.trucks || []);
  const [isNew, setIsNew] = useState(false);
  const [companyName, setCompanyName] = useState(data?.companyName || "");
  const [companyOptions, setCompanyOptions] = useState([]);
  const [containerOptions, setContainerOptions] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [isCreate, setIsCreate] = useState(!data);
  const [isAdd, setIsAdd] = useState(false);
  const [errors, setErrors] = useState({
    companyName: "",
    table: [],
  });

  const fetchSelectCompany = async () => {
    const [resCompany, resContainer] = await Promise.all([
      optionSelect(),
      selectContainer(id),
    ]);

    const companyOptions = resCompany.data?.map((item) => ({
      value: item.companyName,
      label: item.companyName,
    }));
    const containerOptions = resContainer.data?.map((item) => ({
      value: item.containerNumber,
      label: item.containerNumber,
    }));
    setCompanyOptions(companyOptions);
    setContainerOptions(containerOptions);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSelectCompany();
  }, []);

  const handleAddTruck = () => {
    setDataTruck((prev) => [
      ...prev,
      {
        truckCode: "",
        licensePlate: "",
        driverName: "",
        driverPhone: "",
        containerNumber: "",
      },
    ]);
    setIsNew(true);
  };

  const handleOnChange = useCallback(({ id, field, value }) => {
    setDataTruck((prev) =>
      prev.map((item, index) =>
        index === id ? { ...item, [field]: value } : item,
      ),
    );
  }, []);

  const handleSubmit = async () => {
    const newData = dataTruck
      .filter((item) => item.truckCode === "")
      .map(({ truckCode, ...rest }) => rest);
    let payload;
    if (isCreate) {
      payload = {
        companyName,
        trucks: newData,
      };
    } else {
      payload = {
        companyName,
        trucks: dataTruck,
      };
    }

    const result = formSchema.safeParse(payload);

    if (!result.success) {
      let companyError = "";
      const tableErrors = [];

      result.error.issues.forEach((err) => {
        if (err.path[0] === "companyName") {
          companyError = err.message;
        } else if (err.path[0] === "list") {
          tableErrors.push(err.message);
        }
      });

      setErrors({
        companyName: companyError,
        table: tableErrors,
      });

      return;
    }

    setErrors({ companyName: "", table: [] });
    try {
      let res;

      if (isCreate || isAdd) {
        res = await createVanChuyenNoiDia({ id, data: payload });
      } else {
        res = await updateVanChuyenNoiDia({
          id,
          data: {
            trucks: payload.trucks,
          },
        });
      }

      if (res.success) {
        toast.success(isCreate ? "Tạo mới thành công" : "Cập nhật thành công");
        setIsCreate(false);
        setIsEdit(false);
        setIsNew(false);
        setIsAdd(false);
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error(
        isCreate ? "Tạo mới không thành công" : "Cập nhật không thành công",
      );
    }
  };

  const handleDelete = useCallback(async ({ id, code }) => {
    const res = await deleteVanChuyenNoiDia(code);
    if (res.success) {
      toast.success("Xóa thành công");
      setDataTruck((prev) => prev.filter((_, index) => index !== id));
    } else {
      toast.error("Xóa thành công");
    }
  }, []);

  const columns = useMemo(
    () =>
      truckColumn({
        isNew,
        handleOnChange,
        handleDelete,
        containerOptions,
        isEdit,
        isCreate,
      }),
    [isNew, handleOnChange, handleDelete, containerOptions, isEdit, isCreate],
  );
  return (
    <div>
      <Card className="px-12">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Truck size={20} />
            <h3>Thông tin nội địa</h3>
          </div>
          {!isCreate && !isEdit && (
            <Button onClick={() => setIsEdit(true)} variant="secondary">
              Chỉnh sửa
            </Button>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="companyName">Tên đơn vị vận tải</label>
          {isCreate ? (
            <ComboboxComponent
              className="mt-2"
              id="companyName"
              name="companyName"
              placeholder="Chọn tên đơn vị vận chuyển"
              options={companyOptions}
              value={companyName}
              handleOnChange={setCompanyName}
            />
          ) : (
            <b>{companyName}</b>
          )}
          {errors.companyName && (
            <p className="text-red-500 text-xs">{errors.companyName}</p>
          )}
        </div>
        <div className="flex justify-between">
          <p>Thông tin chuyển xe</p>
          {(isCreate || !isEdit) && (
            <Button
              onClick={() => {
                handleAddTruck(), setIsAdd(true);
              }}
            >
              + Thêm chuyến xe
            </Button>
          )}
        </div>

        <div>
          <DataTable data={dataTruck} columns={columns} />
          {errors.table.length > 0 && (
            <div className="mt-4 text-red-500 text-sm">
              <ul className="list-disc ml-5">
                {errors.table.map((err, index) => (
                  <li key={index}>{err}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {(isCreate || isEdit || isAdd) && (
          <div className="flex justify-end gap-4">
            <Button
              variant="secondary"
              onClick={() => {
                setIsAdd(false);
                setDataTruck(data?.trucks || []);
                setIsEdit(false);
                setIsCreate(false);
                setErrors({ companyName: "", table: [] });
              }}
            >
              Hủy
            </Button>
            <Button onClick={handleSubmit}>Lưu</Button>
          </div>
        )}
      </Card>
    </div>
  );
};

export default TruckView;
