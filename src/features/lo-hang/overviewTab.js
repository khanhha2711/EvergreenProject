import { Card } from "@/components/ui/card";
import { Route } from "lucide-react";
import React from "react";
import TimeLine from "./timeline";

// be
const history = [
  { status: "DOCUMENT_UPDATED", updated_at: "2026-04-12T08:45:00",meta:[{}] },
  { status: "CUSTOM_DECLARATION", updated_at: "2026-04-12T10:20:00" },
];

const OverviewTab = () => {
  return (
    <Card className="px-4">
      <div className="flex gap-4 items-center">
        <div className=" rotate-90 ">
          <Route className="text-primary" size={20} />
        </div>
        <h3>Quy trình xử lý lô hàng</h3>
      </div>
      <div>
        <TimeLine data={history} />
      </div>
    </Card>
  );
};

export default OverviewTab;
