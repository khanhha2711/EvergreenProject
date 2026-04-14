import api from "@/lib/axios";

export const YeuCauService = {
  list: (params) => api.get("/requests/list", { params }),
  delete: (id) => api.delete(`/requests/delete/${id}`),
  detail: (id) => api.get(`/requests/${id}`),
  create: (id) => api.post(`/requests`, id),
};
