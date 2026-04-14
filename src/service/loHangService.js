import api from "@/lib/axios";

export const loHangService = {
  list: (params) => api.get(`/shipments`, { params }),
  create: (data) => api.post(`/shipments/create`, data),
  detail: (id) => api.get(`/shipments/${id}`),
};


