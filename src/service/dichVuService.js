import api from "@/lib/axios";

export const dichVuService = {
  list: (params) => api.get(`/services`, { params }),

  create: (data) => api.post(`/services/create`, data),

  delete: (id) => api.delete(`/services/${id}`),

  detail: (id) => api.get(`/services/detail/${id}`),

  update: ({ id, data }) => api.put(`/services/update/${id}`, data),
};
