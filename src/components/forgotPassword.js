"use client";
import { useState } from "react";
import Email from "./quen-mat-khau/email";
import XacThuc from "./quen-mat-khau/xacThuc";
import MatKhauMoi from "./quen-mat-khau/matKhauMoi";
import { useRouter } from "next/navigation";

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
