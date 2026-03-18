import QuenMatKhau from "@/components/forgotPassword";
import Image from "next/image";

export default function ForgotPassword() {
  return (
    <div className="flex w-full h-[100vh]">
      <div className="relative flex-1">
        <Image src="/forgotPassword.png" alt="login" priority fill />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <QuenMatKhau />
      </div>
    </div>
  );
}
