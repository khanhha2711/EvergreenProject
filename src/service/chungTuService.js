import api from "@/lib/axios";

export const chungTuService = {
  create: ({ id, formData }) => api.post(`/documents/create`, { id, formData }),

  delete: (id) => api.delete(`/documents/${id}`),

  update: ({ id, data }) => api.patch(`/documents/${id}`, data),

  detail: (id) => api.get(`/documents/${id}`),
};
