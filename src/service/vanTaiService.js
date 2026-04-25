import api from "@/lib/axios";

export const vanTaiNoiDia = {
  list: (params) => api.get("/company", { params }),
  detail: (id) => api.get(`/company/${id}`),
  create: (data) => api.post(`/company/create`, data),
  update: ({ id, data }) => api.put(`/company/update/${id}`, data),
  select: () => api.get("/company/select"),
};

export const vanTaiHangTau = {
  list: (params) => api.get("/shipping", { params }),
  detail: (id) => api.get(`/shipping/${id}`),
  create: (data) => api.post(`/shipping/create`, data),
  update: ({ id, data }) => api.put(`/shipping/update/${id}`, data),
  select: () => api.get(`/shipping/select`),
};

export const vanChuyenNoiDia = {
  detail: (id) => api.get(`/trucking/${id}`),
  create: ({ id, data }) => api.post(`/trucking/create/${id}`, data),
  update: ({ id, data }) => api.put(`/trucking/update/${id}`, data),
  delete: (id) => api.delete(`/trucking/${id}`),
};

export const datTau = {
  detail: (id) => api.get(`/vessel/${id}`),
  create: ({ id, data }) => api.post(`/vessel/create/${id}`, data),
  update: ({ id, data }) => api.put(`/vessel/${id}`, data),
};

export const container = {
  select: (id) => api.get(`/containers/${id}`),
};

export const transportLocation = {
  map: (id) => api.get(`/trucking/transport/${id}`),
};
