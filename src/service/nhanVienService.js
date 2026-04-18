import api from "@/lib/axios";

export const nhanVienService = {
  list: (params) => api.get(`/employees`, { params }),

  create: (data) => api.post(`/employees/create`, data),

  delete: (id) => api.delete(`/employees/${id}`),

  detail: (id) => api.get(`/employees/detail/${id}`),

  update: ({ id, data }) => api.put(`/employees/update/${id}`, data),
};
