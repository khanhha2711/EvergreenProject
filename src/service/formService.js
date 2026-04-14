import api from "@/lib/axios";

export const formService = {
  submitForm: (form) => api.post("/requests/create", form),
};
