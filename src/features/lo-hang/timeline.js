import { Badge } from "@/components/ui/badge";
import { LANE, SHIPMENT_STEPS } from "@/constants/lo-hang";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Dot } from "lucide-react";

export const IconStep = ({ statusStep }) => {
  switch (statusStep) {
    case "done":
      return (
        <div className="bg-primary p-2 rounded-full">
          <CheckCircle2 className="text-white" size={10} />
        </div>
      );
    case "process":
      return (
        <div className="border-3 border-primary rounded-full">
          <Dot className="text-primary" size={25} />
        </div>
      );
    default:
      return (
        <div className="bg-gray-200 p-2 rounded-full">
          <Clock className="text-gray-500" size={10} />
        </div>
      );
  }
};

export default function TimeLine({ data, steps }) {
  const currentStep = data[data.length - 1]?.status;
  const itemLog = data.find((item) => item.status === "Customs Declaration");
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const isDone = data.some((item) => item.status === step.code);

        let statusStep = "wait";
        if (step.code === currentStep) statusStep = "process";
        else if (isDone) statusStep = "done";

        return (
          <div key={step.code} className="flex gap-2 relative">
            <div className="flex flex-col items-center w-10">
              <IconStep statusStep={statusStep} />
              {index < SHIPMENT_STEPS.length - 1 && (
                <div className="bg-gray-300 flex-1 w-0.5"></div>
              )}
            </div>

            <div
              className={cn(
                "mb-6 w-full",
                statusStep === "process" &&
                  "bg-[#e7fbee] pl-4 py-2 border-l-4 border-l-primary rounded-sm",
              )}
            >
              <p className="font-semibold text-sm">{step?.title}</p>
              <p className="text-xs text-gray-500">
                {step?.description ||
                  data?.find((item) => item.status === step.code)?.updatedAt}
              </p>
              {step.code === "Customs Declaration" && itemLog?.dto && (
                <div className="pt-2">
                  <Badge
                    variant={
                      LANE.find((lane) => lane.value === itemLog?.dto?.lane)
                        ?.variant
                    }
                  >
                    {
                      LANE.find((lane) => lane.value === itemLog?.dto?.lane)
                        ?.label
                    }
                  </Badge>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
