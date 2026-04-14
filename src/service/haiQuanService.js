import api from "@/lib/axios";

export const haiQuanService = {
  create: ({ id, formData }) => api.post(`/customs/create`, { id, formData }),

  delete: (id) => api.delete(`/customs/${id}`),

  update: ({ id, data }) => api.patch(`/customs/${id}`, data),

  detail: (id) => api.get(`/customs/${id}`),
};
