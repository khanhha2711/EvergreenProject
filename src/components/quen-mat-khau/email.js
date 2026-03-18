"use client";
import { useActionState, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sendEmail } from "@/actions/forgotPasswordAction";
import { Input } from "../ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

export default function Email({ onSuccess }) {
  const [state, formAction, isPending] = useActionState(sendEmail, {
    success: false,
    error: null,
  });
  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state.success]);
  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Quên mật khẩu</h1>
      <p className="text-sm mb-4">
        Nhập địa chỉ email và chúng tôi sẽ gửi hướng dẫn đặt lại mật khẩu
      </p>
      <form action={formAction} className="space-y-4 flex flex-col ">
        <div className="relative w-[30vw]">
          <h3 className="text-base font-normal mb-2">Địa chỉ email</h3>
          <Input
            type={"email"}
            name="email"
            placeholder="Địa chỉ email"
            className={cn("pl-2 h-10")}
            required
          />
        </div>
        <div className="flex items-center space-x-2 justify-center">
          <ArrowLeft size={15} className="text-gray-600" />
          <Link href="/dang-nhap" className="text-sm text-center">
            Quay lại Đăng nhập
          </Link>
        </div>

        {state.error && !isPending && (
          <div className="text-sm text-destructive">{state.error}</div>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-full mr-2" />
            </div>
          ) : (
            "Gửi"
          )}
        </Button>
      </form>
    </div>
  );
}
