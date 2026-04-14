import api from "@/lib/axios";

export const baoGiaService = {
  list: (params) => api.get(`/quotations`, { params }),

  delete: (id) => api.delete(`/quotations/${id}`),

  detail: (id) => api.get(`/quotations/${id}`),

  update: ({ id, data }) => api.put(`/quotations/update/${id}`, { data: data }),

  create: (id) =>
    api.post(`/quotations/create`, {
      requestCode: id,
      employeeCode: "NV-2026-001",
    }),

  updateState: ({ id, state }) =>
    api.put(`/quotations/update`, { quotationCode: id, status: state }),
};
