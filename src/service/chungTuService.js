import api from "@/lib/axios";

export const chungTuService = {
  list: (id) => api.get(`/documents/${id}`),

  create: ({ id, formData }) => api.post(`/documents/create/${id}`, formData),

  delete: (id) => api.delete(`/documents/${id}`),

  update: ({ id, data }) => api.put(`/documents/update/${id}`, data),

  detail: (id) => api.get(`/documents/detail/${id}`),
};
