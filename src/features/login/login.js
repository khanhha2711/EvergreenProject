"use client";
import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/actions/loginAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, LockKeyhole, UserRound } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, {
    success: false,
    error: null,
  });
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      router.push("/yeu-cau");
    }
  }, [state.success, router]);

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-2xl mb-4">Đăng nhập</h1>
      <form action={formAction} className="space-y-4 flex flex-col ">
        <div className="relative w-[30vw]">
          <UserRound
            className="text-gray-400 absolute h-full left-2"
            size={15}
          />
          <Input
            name="gmail"
            placeholder="Nhập gmail"
            className={cn("pl-8 h-10")}
            required
          />
        </div>
        <div className="relative">
          <LockKeyhole
            className="text-gray-400 absolute h-full left-2"
            size={15}
          />
          <Input
            name="password"
            placeholder="Mật khẩu"
            className="pl-8 h-10"
            type="password"
            required
          />
        </div>
        <Link href="/quen-mat-khau">Quên mật khẩu</Link>
        {state.error && !isPending && (
          <div className="text-sm text-destructive">{state.error}</div>
        )}
        <Button type="submit" disabled={isPending}>
          {isPending ? (
            <div className="flex items-center">
              <Loader2 className="animate-spin h-full mr-2" />
            </div>
          ) : (
            "Đăng nhập"
          )}
        </Button>
      </form>
    </div>
  );
}
