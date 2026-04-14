import { getDichVu } from "@/actions/dichVuAction";

export const getServiceFields = async () => {
  const res = await getDichVu();
  const data = res.data;

  const services =
    data?.map((service) => ({
      value: service.serviceCode,
      label: service.serviceName,
    })) || "";
  return services;
};
