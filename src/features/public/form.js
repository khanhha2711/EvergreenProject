"use client";
import { useState } from "react";
import KhachHang from "../../components/form/khachHang";
import HangHoa from "../../components/form/hangHoa";
import VanChuyen from "../../components/form/vanChuyen";
import Stepper from "../../components/navigation/stepper";
import { Button } from "../../components/ui/button";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { submitForm } from "@/actions/formAction";
import { toast } from "sonner";
import { format } from "date-fns";

export default function Form() {
  const [form, setForm] = useState({});
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const stepFormId = {
    1: "khachHang",
    2: "hangHoa",
    3: "vanChuyen",
  };
  console.log(form);
  const id = stepFormId[step];

  const handleNext = async (data) => {
    const newForm = { ...form, ...data };
    setForm(newForm);
    if (step === 3) {
      setIsLoading(true);
      const res = await submitForm(newForm);
      if (res.success) {
        setForm({});
        setStep(1);
        toast.success("Chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất");
      } else {
        toast.error("Gửi form không thành ");
      }
      setIsLoading(false);
    } else {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setStep((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center w-[60vw]">
      <Stepper currentStep={step} />
      {step === 1 && (
        <KhachHang onNext={handleNext} defaultValue={form.customer} />
      )}

      {step === 2 && <HangHoa onNext={handleNext} defaultValue={form.cargo} />}

      {step === 3 && (
        <VanChuyen onNext={handleNext} defaultValue={form.transport} />
      )}

      <div className="w-full flex justify-between mt-6">
        <Button
          className="cursor-pointer bg-card border-gray-400 border text-black hover:text-white"
          disabled={step === 1}
          onClick={handleBack}
        >
          <ChevronLeft size={18} />
          Quay về
        </Button>

        <Button
          type="submit"
          form={id}
          className="cursor-pointer"
          disabled={isLoading}
        >
          {step === 3 ? (
            <div>
              {isLoading ? (
                <Loader2 className="animate-spin h-full mr-2" />
              ) : (
                "Gửi"
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              Tiếp tục
              <ChevronRight size={18} />
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
