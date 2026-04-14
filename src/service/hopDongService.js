import api from "@/lib/axios";

export const HopDongService = {
  list: (params) => api.get(`/contracts`, { params }),

  create: (formData) => api.post("/contracts/create", formData),

  delete: (id) => api.delete(`/contracts/${id}`),

  detail: (id) => api.get(`/contracts/${id}`),
};
