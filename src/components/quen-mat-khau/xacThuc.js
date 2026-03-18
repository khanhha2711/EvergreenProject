"use client";
import { useActionState, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { sendEmail, sendOTP } from "@/actions/forgotPasswordAction";
import { Input } from "../ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export default function XacThuc({ onSuccess }) {
  const [state, formAction, isPending] = useActionState(sendOTP, {
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
      <h1 className="text-2xl mb-4">Nhập mã xác thực</h1>
      <p className="text-sm mb-4">
        Nhập mã xác thực đã gửi qua địa chỉ email của bạn
      </p>
      <form action={formAction} className="space-y-4 flex flex-col ">
        <div className="relative w-[30vw]">
          <h3 className="text-base font-normal mb-2">Mã xác thực</h3>
          <Input
            name="maXacThuc"
            placeholder="Mã xác thực"
            className={cn("pl-2 h-10")}
            required
          />
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
