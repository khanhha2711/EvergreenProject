"use client";
import { useActionState, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sendNewPassword } from "@/actions/forgotPasswordAction";
import { Input } from "../ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "../ui/button";
import z from "zod";

const resetPasswordSchema = z
  .object({
    password1: z
      .string()
      .min(8, "Mật khẩu phải ít nhất 8 ký tự")
      .regex(/[A-Z]/, "Phải có ít nhất 1 chữ hoa")
      .regex(/[0-9]/, "Phải có ít nhất 1 số")
      .regex(/[!@#$%^&*]/, "Phải có ký tự đặc biệt"),

    password2: z.string(),
  })
  .refine((data) => data.password1 === data.password2, {
    message: "Mật khẩu nhập lại không khớp",
    path: ["password2"],
  });
export default function MatKhauMoi({ onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [state, formAction, isPending] = useActionState(sendNewPassword, {
    success: false,
    error: null,
  });

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success]);

  const handleSubmit = (e) => {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const result = resetPasswordSchema.safeParse(data);
    if (!result.success) {
      e.preventDefault();
      setPasswordError(result.error.issues[0].message);
    } else {
      setPasswordError("");
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Nhập mật khẩu mới</h1>

      <form
        action={formAction}
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col"
      >
        <div className="relative w-[30vw]">
          {/* password */}
          <div className="relative mb-3">
            <Input
              type={showPassword ? "text" : "password"}
              name="password1"
              placeholder="Mật khẩu mới"
              className={cn("pl-2 pr-10 h-10")}
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* confirm password */}
          <Input
            type={showPassword ? "text" : "password"}
            name="password2"
            placeholder="Nhập lại mật khẩu"
            className={cn("pl-2 h-10")}
            required
          />
        </div>

        {passwordError && (
          <div className="text-sm text-destructive">{passwordError}</div>
        )}

        {state.error && !isPending && (
          <div className="text-sm text-destructive">{state.error}</div>
        )}

        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-full mr-2" />
            </div>
          ) : (
            "Đổi mật khẩu"
          )}
        </Button>
      </form>
    </div>
  );
}
