"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import XacThuc from "@/components/quen-mat-khau/xacThuc";
import MatKhauMoi from "@/components/quen-mat-khau/matKhauMoi";
import Email from "@/components/quen-mat-khau/email";

export default function QuenMatKhau() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  return (
    <div>
      {step === 1 && <Email onSuccess={() => setStep(2)} />}
      {step === 2 && <XacThuc onSuccess={() => setStep(3)} />}
      {step === 3 && <MatKhauMoi onSuccess={() => router.push("/dang-nhap")} />}
    </div>
  );
}
