"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Box, Container, Ship, Truck } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VanTaiTab() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleChangeTab = (tab) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    router.push(`?${params.toString()}`);
  };
  const currentTab = searchParams.get("tab") || "noi-dia";
  return (
    <div className="flex items-center gap-8 py-2 px-8 border-b-1 border-gray-300">
      <button
        className={cn(
          " text-muted-foreground hover:cursor-pointer ",
          currentTab === "noi-dia"
            ? "text-primary underline underline-offset-11 decoration-[0.10rem]"
            : "",
        )}
        onClick={() => handleChangeTab("noi-dia")}
      >
        <div className="flex gap-2 items-center">
          <Truck size={15} />
          <p className="font-semibold">Vận tải nội địa</p>
        </div>
      </button>
      <button
        className={cn(
          " text-muted-foreground hover:cursor-pointer ",
          currentTab === "hang-tau"
            ? "text-primary underline underline-offset-11 decoration-[0.10rem]"
            : "",
        )}
        onClick={() => handleChangeTab("hang-tau")}
      >
        <div className="flex gap-2 items-center">
          <Ship size={15} />
          <b>Hãng tàu</b>
        </div>
      </button>
    </div>
  );
}
