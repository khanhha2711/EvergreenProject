export const userService = {
  list: (gmail) => api.get("/login/user", gmail),
};
