import api from "@/lib/axios";

export const vanTaiNoiDia = {
  list: (params) => api.get("/company", { params }),
  detail: (id) => api.get(`/company/${id}`),
  create: (data) => api.post(`/company/create`, data),
  update: ({ id, data }) => api.put(`/company/update/${id}`, data),
};

export const vanTaiHangTau = {
  list: (params) => api.get("/shipping", { params }),
  detail: (id) => api.get(`/shipping/${id}`),
  create: (data) => api.post(`/shipping/create`, data),
  update: ({ id, data }) => api.put(`/shipping/update/${id}`, data),
};
