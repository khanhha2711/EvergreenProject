import api from "@/lib/axios";

export const loHangService = {
  list: (params) => api.get(`/shipments`, { params }),
  create: (data) => api.post(`/shipments/create`, data),
  detail: (id) => api.get(`/shipments/${id}`),
  update: ({ id, data }) => api.put(`/shipments/update/${id}`, data),
  dashboard: (id) => api.get(`/shipments/over/${id}`),
};
