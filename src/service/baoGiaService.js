import api from "@/lib/axios";

export const baoGiaService = {
  list: (params) => api.get(`/baoGia`, { params }),

  delete: (id) => api.delete(`/baoGia/${id}`),

  detail: (id) => api.get(`/baoGia/${id}`),
};
