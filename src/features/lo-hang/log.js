import { Card } from "@/components/ui/card";
import { Dot } from "lucide-react";
import React from "react";

const Log = () => {
  return (
    <div>
      <Card className="flex">
        <div className="flex flex-row gap-4">
          <div className="border-l-3 relative ml-4 ">
            <div className="absolute -top-6.5 -left-6.5">
              <Dot size={50} className="text-primary" />
            </div>
            <div className="h-15 w-fit"></div>
          </div>
          <div>
            <b>Chờ lấy hàng</b>
            <p>22/2/2026</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Log;
