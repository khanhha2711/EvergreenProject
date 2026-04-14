import api from "@/lib/axios";

export const khachHangService = {
  list: (params) => api.get(`/customers`, { params }),

  create: (data) => api.post(`/customers/Create`, data),

  delete: (id) => api.delete(`/customers/${id}`),

  detail: (id) => api.get(`/customers/Detail/${id}`),

  update: ({ id, data }) => api.patch(`/customers/${id}`, data),
};
