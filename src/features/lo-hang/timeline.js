import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, Dot } from "lucide-react";

export const SHIPMENT_STEPS = [
  {
    code: "DOCUMENT_UPDATED",
    title: "Cập nhật chứng từ",
    description: "Hoàn tất hồ sơ lô hàng",
  },
  {
    code: "CUSTOM_DECLARATION",
    title: "Khai báo hải quan",
    description: "Khai báo và kiểm tra chứng từ",
  },
  {
    code: "CLEARANCE",
    title: "Thông quan",
    description: "Kiểm tra và cho phép thông quan",
  },
  {
    code: "TRANSPORT",
    title: "Vận chuyển",
    description: "Đang vận chuyển hàng hóa",
  },
];

const IconStep = ({ statusStep }) => {
  switch (statusStep) {
    case "done":
      return (
        <div className="bg-primary p-2 rounded-full">
          <CheckCircle2 className="text-white" size={15} />
        </div>
      );
    case "process":
      return (
        <div className="border-4 border-primary rounded-full">
          <Dot className="text-primary" size={30} />
        </div>
      );
    default:
      return (
        <div className="bg-gray-200 p-2 rounded-full">
          <Clock className="text-gray-500" size={15} />
        </div>
      );
  }
};

export default function TimeLine({ data }) {
  const currentStep = data[data.length - 1]?.status;

  return (
    <div className="flex flex-col">
      {SHIPMENT_STEPS.map((step, index) => {
        const isDone = data.some((item) => item.status === step.code);

        let statusStep = "wait";
        if (step.code === currentStep) statusStep = "process";
        else if (isDone) statusStep = "done";

        return (
          <div key={step.code} className="flex gap-4 relative">
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
              <p className="font-semibold">{step.title}</p>
              <p className="text-sm text-gray-500">{step.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
