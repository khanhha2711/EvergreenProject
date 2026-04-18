"use client";
import { submitForm } from "@/actions/formAction";
import { CalenDarInput } from "@/components/inputs/calendar";
import LocationInput from "@/components/inputs/locationInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CARGOFIELDS } from "@/constants/hang-hoa";
import { CUSTOMER_FIELDS } from "@/constants/khach-hang";
import { SHIPMENT_FIELDS } from "@/constants/van-chuyen";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { validate } from "../../lib/validation";
import { schema } from "../../lib/shemaValidation";
import { buildSectionData } from "@/lib/buildSectionData";
import { useRouter } from "next/navigation";
import PATH from "@/routes/path";
import DichVuTable from "./dichVuTable";
import { SelectComponent } from "@/components/inputs/select";
import { ChangeMoney } from "@/lib/changeMoney";
import ConfirmModal from "@/components/modal/comfirmModal";
import { updateBaoGia } from "@/actions/baoGiaAction";
import { getDichVu } from "@/actions/dichVuAction";
import { format, isValid, parse } from "date-fns";
import { CONTAINER } from "@/constants/form";

export default function Form({ form = {}, isEdit }) {
  const [shipping, setShipping] = useState(form?.transportDTO || {});
  const [currentCargoCategory, setCargoCategory] = useState(
    form?.cargo?.["cargoCategory"] || "",
  );
  const [errors, setError] = useState({});
  const [items, setItems] = useState(form.items);
  const [isNew, setIsNew] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [serviceFields, setServiceFields] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const rawDate = shipping?.createdAt;

  let formattedDate = null;

  if (rawDate) {
    let parsedDate;
    if (typeof rawDate === "string") {
      parsedDate = parse(rawDate, "dd/MM/yyyy", new Date());
    } else {
      parsedDate = new Date(rawDate);
    }
    if (isValid(parsedDate)) {
      formattedDate = format(parsedDate, "yyyy-MM-dd");
    }
  }

  const updateState = (fieldName, value) => {
    setShipping((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };
  const router = useRouter();

  useEffect(() => {
    const fetchServices = async () => {
      const res = await getDichVu();
      const data = res.data;
      if (res.success) {
        setServices(data);
        setServiceFields(
          res.data.map((s) => ({
            value: s.serviceCode,
            label: s.serviceName,
          })),
        );
      }
    };

    fetchServices();
  }, []);

  const handleNext = async (e) => {
    setLoading(true);
    e.preventDefault();

    const formData = new FormData(e.target);
    const services = formData.getAll("service");
    const raw = Object.fromEntries(formData);

    const data = {
      customer: buildSectionData({ fields: CUSTOMER_FIELDS, rawData: raw }),
      cargo: buildSectionData({
        fields: CARGOFIELDS,
        rawData: raw,
      }),
      transport: shipping,
    };
    data.cargo.cargoCategory = currentCargoCategory;

    if (!isEdit) {
      data.customer.service = services;
      const { isValid, errors } = validate({ schema, data });
      if (!isValid) {
        setError(errors);
        return;
      }
      setError({});
      const res = await submitForm(data);
      if (res.success) {
        router.push(PATH.ADMIN.YEUCAU.DANHSACH);
      } else {
        setLoading(false);
        toast.error("Lưu không thành công hãy thực hiện lại");
      }
    } else {
      console.log("edit", isEdit);
      console.log("data", items);
      const res = await updateBaoGia({ id: form.id, data: items });
      if (res.success) {
        toast.success("Cập nhật thành công");
        router.push(PATH.ADMIN.BAOGIA.CHITIET(form.id));
      } else {
        setLoading(false);
        toast.error("Cập nhật không thành công hãy thực hiện lại");
      }
    }
  };
  const handleAdd = () => {
    setItems((prev) => [
      ...prev,
      {
        id: "",
        name: "",
        quantity: 0,
        unit: 0,
        unitPrice: 0,
        total: 0,
      },
    ]);
    setIsNew(true);
  };
  const handleOnChange = (value) => {
    setCargoCategory(value);
  };
  const subtotal = items?.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * 0.1;
  const totalAmount = subtotal + vatAmount;
  return (
    <div>
      {isOpen && (
        <ConfirmModal
          title="Xác nhận hủy"
          content="Bạn có chắc chắn muốn hủy yêu cầu này?"
          onConfirm={() => {
            setIsOpen(false);
            router.push(PATH.ADMIN.YEUCAU.DANHSACH);
          }}
          onCancel={() => setIsOpen(false)}
        />
      )}
      <form className="space-y-4 mx-10 mb-10" onSubmit={handleNext}>
        <Card className={"px-6"}>
          <h3>Thông tin khách hàng</h3>
          <div className="grid grid-cols-2 gap-6 mx-4">
            {CUSTOMER_FIELDS.map((field) => (
              <div key={field.name}>
                <p className="text-sm mb-2">{field.label}</p>
                {isEdit ? (
                  <b>{form?.customer?.[field.name] || ""}</b>
                ) : (
                  <Input
                    placeholder={field.placeholder}
                    name={field.name}
                    defaultValue={form?.customer?.[field.name] || ""}
                  />
                )}
                {errors[`customer.${field.name}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`customer.${field.name}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
          {!isEdit && (
            <div>
              <h3 className="mb-4">Dịch vụ</h3>
              <div className="flex gap-10 ml-4">
                {serviceFields.map((service) => (
                  <div key={service.value}>
                    <Checkbox
                      name="service"
                      value={service.value}
                      className="mr-2"
                    />
                    {service.label}
                  </div>
                ))}
                {errors["customer.service"] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors["customer.service"]}
                  </p>
                )}
              </div>
            </div>
          )}
        </Card>
        <Card className="px-6">
          <h3>Thông tin lô hàng</h3>
          <div className="grid grid-cols-3 gap-6 mx-4">
            {CARGOFIELDS.map((field) => (
              <div key={field.name}>
                <p className="text-sm mb-2">{field.label}</p>
                {isEdit ? (
                  <b>
                    {field.name === "cargoCategory"
                      ? field.options.find(
                          (option) =>
                            option.value === form?.cargo?.[field.name],
                        ).label
                      : form?.cargo?.[field.name]}
                  </b>
                ) : field.name === "cargoCategory" ? (
                  <SelectComponent
                    value={currentCargoCategory}
                    placeHolder={field.placeholder}
                    options={field.options}
                    onChange={(value) => handleOnChange(value)}
                  />
                ) : (
                  <Input
                    placeholder={field.placeholder}
                    name={field.name}
                    defaultValue={form?.cargo?.[field.name]}
                  />
                )}

                {errors[`cargo.${field.name}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`cargo.${field.name}`]}
                  </p>
                )}
              </div>
            ))}
            {SHIPMENT_FIELDS.map((field) => (
              <div key={field.name}>
                <p className="text-sm mb-2">{field.label}</p>
                {isEdit ? (
                  <b>{shipping?.[field.name] || ""}</b>
                ) : field.name === "containerType" ? (
                  <SelectComponent
                    placeHolder="Chọn loại container"
                    options={CONTAINER}
                    onChange={(e) => updateState("containerType", e)}
                    value={shipping?.[field.name] || ""}
                  />
                ) : field.name !== "createdAt" ? (
                  <LocationInput
                    diaDiem={(e) => updateState(field.name, e)}
                    value={shipping?.[field.name] || ""}
                  />
                ) : (
                  <CalenDarInput
                    date={formattedDate}
                    style="dd/MM/yyyy"
                    updateState={(value) => updateState("createdAt", value)}
                  />
                )}
                {errors[`shipping.${field.name}`] && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors[`shipping.${field.name}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Card>
        {isEdit && (
          <Card className="flex flex-col bg-white px-4">
            <div className="flex justify-between items-center">
              <h3>Bảng dịch vụ</h3>
              <Button
                type="button"
                onClick={() => handleAdd()}
                className="w-fit self-end mb-2"
                variant="secondary"
              >
                Thêm dịch vụ
              </Button>
            </div>

            <DichVuTable
              data={items}
              isAction={true}
              isNew={isNew}
              handleUpdate={setItems}
              services={services}
              serviceFields={serviceFields}
            />
            <div className="flex justify-end pr-10 ">
              <div className="w-fit space-y-1">
                <div className="flex gap-30">
                  <p>Tạm tính:</p>
                  <div className="font-bold text-sm">
                    <ChangeMoney amount={subtotal} />
                  </div>
                </div>
                <div className="flex justify-between">
                  <p>Thuế VAT(10%):</p>
                  <div className="font-bold text-sm">
                    <ChangeMoney amount={vatAmount} />
                  </div>
                </div>
                <hr />
                <div className="flex justify-between">
                  <p className="font-bold">Tổng cộng:</p>
                  <div className="text-primary text-sm">
                    <ChangeMoney amount={totalAmount} />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        )}
        <div className="flex justify-end mt-2 gap-2">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setIsOpen(true)}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button className="w-fit" type="submit" disabled={loading}>
            Gửi
          </Button>
        </div>
      </form>
    </div>
  );
}
