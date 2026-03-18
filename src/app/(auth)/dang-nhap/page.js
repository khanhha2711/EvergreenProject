import LoginForm from "@/components/login";
import Image from "next/image";
export default function LoginPage() {
  return (
    <div className="flex w-full h-[100vh]">
      <div className="relative flex-1">
        <Image src="/login.png" alt="login" priority fill />
      </div>
      <div className="flex-1 flex items-center justify-center">
        <LoginForm />
      </div>
    </div>
  );
}
