import api from "@/lib/axios";

export const haiQuanService = {
  create: ({ id, formData }) => api.post(`/declaration/create/${id}`, formData),
  detail: (id) => api.get(`/declaration/detail/${id}`),
  update: ({ id, data }) => api.put(`/declaration/update/${id}`, data),
};
