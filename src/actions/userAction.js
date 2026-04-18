import { userService } from "@/service/userService";

export async function getUser() {
  try {
    const res = await userService.list();
    console.log(res);
    return { success: true, data: res.data };
  } catch (error) {
    return {
      success: false,
      error: error?.response?.data?.message || "Lỗi hệ thống",
    };
  }
}
