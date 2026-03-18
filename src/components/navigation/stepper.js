import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

export default function Stepper({ currentStep }) {
  const STEPS = [
    { id: 1, label: "Thông tin khách hàng" },
    { id: 2, label: "Thông tin hàng hóa" },
    { id: 3, label: "Thông tin vận chuyển" },
  ];
  return (
    <div className="flex w-full ml-10">
      {STEPS.map((step) => {
        const isCompleted = currentStep > step.id;
        const isActive = currentStep == step.id;
        return (
          <div key={step.id} className="flex relative container pr-0">
            <div className="flex-2 flex flex-col items-center text-center gap-2">
              <div
                className={cn(
                  "bg-secondary w-8 h-8 text-center rounded-full flex items-center justify-center",
                  isCompleted && "bg-primary",
                  isActive && "bg-primary",
                )}
              >
                {isCompleted ? (
                  <Check className="text-white" size={16} />
                ) : (
                  <p
                    className={cn(
                      "text-black font-semibold text-sm",
                      isActive && "text-white",
                    )}
                  >
                    {step.id}
                  </p>
                )}
              </div>
              <div
                className={cn(
                  "text-black text-xs",
                  isCompleted && "text-primary",
                  isActive && "text-primary",
                )}
              >
                {step.label}
              </div>
            </div>
            <div className=" flex-1 w-full flex items-center  ">
              {step.id < 3 && (
                <div
                  className={cn(
                    "w-full border-1 border-black",
                    isActive && "border-primary",
                    isCompleted && "border-primary",
                  )}
                ></div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
